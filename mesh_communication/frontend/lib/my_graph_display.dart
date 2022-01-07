import 'dart:collection';
import 'dart:math' as math;

import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:graphview/GraphView.dart';
import 'package:meshcommunication/my_graph.dart';
import 'package:vector_math/vector_math.dart' as vm;

class MyGraphDisplay extends StatefulWidget {
  static const double strokeWidth = 2;
  static const double highlightStrokeWidth = 4;
  static const Color normalColor = Colors.grey;
  static const Color sendColor = Colors.black;
  static const Color recvColor = Colors.blue;
  static const Color destColor = Colors.green;
  static const Color failColor = Colors.red;

  final Algorithm _algo;

  late final VoidCallback _resetGraphView;

  MyGraphDisplay(BuildContext context, {Key? key})
      : _algo = FruchtermanReingoldAlgorithm(iterations: 10),
        super(key: key) {
    _initColors(context);
  }

  void _initColors(BuildContext context) {
    HashMap<int, Color> nodeColors = HashMap();

    // orchestrator color
    nodeColors[0] = const Color.fromRGBO(45, 45, 45, 1.0);

    // rest of the colors
    final int nColors = MyGraph.of(context).graph.nodeCount() - 1;
    var angle = 0;
    var increase = 360 / nColors;
    for (int i = 1; i <= nColors; i++) {
      var H = (angle + increase) * math.pi / 180;
      angle += increase as int;
      var S = 0.8;
      var V = 0.8;
      var O = 1.0;
      var hsvVec = vm.Vector4(H, S, V, O);
      var rgbVec = vm.Vector4.zero();
      vm.Colors.hsvToRgb(hsvVec, rgbVec);
      int nodeId = MyGraph.of(context).graph.getNodeAtPosition(i).key!.value;
      if (nodeColors.containsKey(nodeId)) {
        if (kDebugMode) {
          print(
              "Duplicated id (" + nodeId.toString() + ") for color generation");
        }
        continue;
      }
      nodeColors[nodeId] = Color.fromRGBO((rgbVec.x * 255).toInt(),
          (rgbVec.y * 255).toInt(), (rgbVec.z * 255).toInt(), 1.0);
    }

    MyGraph.of(context).nodeColors = nodeColors;
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

  Widget _getNode(int id, Color color) {
    return Material(
      key: Key(id.toString()),
      color: color,
      borderRadius: BorderRadius.circular(4),
      child: InkWell(
        borderRadius: BorderRadius.circular(4),
        onTap: () {
          if (kDebugMode) {
            print("Clicked node " + id.toString());
          }
        },
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Text(
            id.toString(),
            style: const TextStyle(
                color: Colors.white, fontWeight: FontWeight.bold),
          ),
        ),
      ),
    );
  }

  Widget _getGraphView(BuildContext context) {
    return GraphView(
      key: const Key("Graph"),
      graph: MyGraph.of(context).graph,
      algorithm: widget._algo,
      builder: (Node node) {
        // I can decide what widget should be shown here based on the id
        int nodeId = node.key!.value;
        Color? nodeColor = MyGraph.of(context).nodeColors[nodeId];
        if (nodeColor == null) {
          if (kDebugMode) {
            print("Missing color for node " + nodeId.toString());
          }
          nodeColor = Colors.red;
        }
        return _getNode(nodeId, nodeColor);
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Expanded(
          child: InteractiveViewer(
            // prevent the default OverflowBox (we'll create our own)
            constrained: true,
            boundaryMargin: const EdgeInsets.all(double.infinity),
            transformationController: _transformationController,
            onInteractionStart: _onInteractionStart,
            minScale: 0.1,
            maxScale: 10.0,
            child: OverflowBox(
              alignment: Alignment.center,
              minWidth: 0.0,
              minHeight: 0.0,
              maxWidth: double.infinity,
              maxHeight: double.infinity,
              child: _getGraphView(context),
            ),
          ),
          flex: 7,
        ),
        Expanded(
          child: MyGraph.of(context).logDisplay,
          flex: 3,
        )
      ],
    );
  }
}
