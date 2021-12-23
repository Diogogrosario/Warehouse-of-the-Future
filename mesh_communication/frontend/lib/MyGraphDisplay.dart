import 'package:flutter/material.dart';
import 'dart:math' as math;
import 'package:graphview/GraphView.dart';
import 'package:myapp/MyGraph.dart';
import 'package:vector_math/vector_math.dart' as vm;

class MyGraphDisplay extends StatefulWidget {
  final Algorithm algo;
  final List<Color> colors;

  late final VoidCallback _resetGraphView;

  MyGraphDisplay(BuildContext context, {Key? key})
      : algo = FruchtermanReingoldAlgorithm(iterations: 10),
        colors = List.filled(0, Colors.black, growable: true),
        super(key: key) {
    _initColors(context);
  }

  void _initColors(BuildContext context) {
    // orchestrator color
    colors.add(const Color.fromRGBO(45, 45, 45, 1.0));

    // rest of the colors
    final int nColors = MyGraph.of(context).graph.nodeCount() - 1;
    var angle = 0;
    var increase = 360 / nColors;
    for (int i = 0; i < nColors; i++) {
      var H = (angle + increase) * math.pi / 180;
      angle += increase as int;
      var S = 0.8;
      var V = 0.8;
      var O = 1.0;
      var hsvVec = vm.Vector4(H, S, V, O);
      var rgbVec = vm.Vector4.zero();
      vm.Colors.hsvToRgb(hsvVec, rgbVec);
      colors.add(
        Color.fromRGBO((rgbVec.x * 255).toInt(), (rgbVec.y * 255).toInt(),
            (rgbVec.z * 255).toInt(), 1),
      );
    }
  }

  void resetGraphView() {
    _resetGraphView();
  }

  @override
  _MyGraphDisplay createState() => _MyGraphDisplay();
}

class _MyGraphDisplay extends State<MyGraphDisplay>
    with TickerProviderStateMixin {
  final TransformationController _transformationController =
      TransformationController();
  Animation<Matrix4>? _animationReset;
  late final AnimationController _controllerReset;

  void _onAnimateReset() {
    _transformationController.value = _animationReset!.value;
    if (!_controllerReset.isAnimating) {
      _animationReset!.removeListener(_onAnimateReset);
      _animationReset = null;
      _controllerReset.reset();
    }
  }

  // for reset button
  void _animateResetInitialize() {
    // if reset is already running, go away
    if (_controllerReset.status == AnimationStatus.forward) return;

    _controllerReset.reset();
    _animationReset = Matrix4Tween(
      begin: _transformationController.value,
      end: Matrix4.identity(),
    ).animate(_controllerReset);
    _animationReset!.addListener(_onAnimateReset);
    _controllerReset.forward();
  }

  // Stop a running reset to home transform animation.
  void _animateResetStop() {
    _controllerReset.stop();
    _animationReset?.removeListener(_onAnimateReset);
    _animationReset = null;
    _controllerReset.reset();
  }

  void _onInteractionStart(ScaleStartDetails details) {
    // If the user tries to cause a transformation while the reset animation is
    // running, cancel the reset animation.
    if (_controllerReset.status == AnimationStatus.forward) {
      _animateResetStop();
    }
  }

  @override
  void initState() {
    super.initState();

    widget._resetGraphView = _animateResetInitialize;

    _controllerReset = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 500),
    );
  }

  @override
  void dispose() {
    _controllerReset.dispose();
    super.dispose();
  }

  Widget getNode(String name, Color color) {
    return Material(
      color: color,
      borderRadius: BorderRadius.circular(4),
      child: InkWell(
        borderRadius: BorderRadius.circular(4),
        onTap: () {
          print("Clicked node " + name);
        },
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Text(
            name,
            style: const TextStyle(
                color: Colors.white, fontWeight: FontWeight.bold),
          ),
        ),
      ),
    );
  }

  Widget getGraphView(BuildContext context) {
    return GraphView(
      graph: MyGraph.of(context).graph,
      algorithm: widget.algo,
      builder: (Node node) {
        // I can decide what widget should be shown here based on the id
        String nodeName = node.key!.value;
        return getNode(nodeName, widget.colors[int.parse(nodeName)]);
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return InteractiveViewer(
      constrained: false,
      //boundaryMargin: const EdgeInsets.fromLTRB(8.0, 8.0, 8.0, 16.0),
      boundaryMargin: const EdgeInsets.all(double.infinity),
      transformationController: _transformationController,
      onInteractionStart: _onInteractionStart,
      minScale: 0.1,
      maxScale: 10.0,
      child: getGraphView(context),
    );
  }
}
