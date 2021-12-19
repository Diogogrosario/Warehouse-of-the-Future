import 'dart:ui';

import 'package:graphview/GraphView.dart';

class UndirectedGraph extends Graph {
  @override
  Edge? getEdgeBetween(Node source, Node? destination) {
    Edge? edge = super.getEdgeBetween(source, destination);
    if (edge != null || destination == null) return edge;
    return super.getEdgeBetween(destination, source);
  }
}
