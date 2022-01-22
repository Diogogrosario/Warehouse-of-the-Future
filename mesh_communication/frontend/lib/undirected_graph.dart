import 'dart:ui';

import 'package:graphview/GraphView.dart';

class UndirectedGraph extends Graph {
  @override
  Edge? getEdgeBetween(Node source, Node? destination) {
    Edge? edge = super.getEdgeBetween(source, destination);
    if (edge != null || destination == null) return edge;
    return super.getEdgeBetween(destination, source);
  }

  @override
  Edge addEdge(Node source, Node destination, {Paint? paint}) {
    Edge? existingEdge = getEdgeBetween(source, destination);
    if (existingEdge != null) return existingEdge;

    final edge = Edge(source, destination, paint: paint);
    addEdgeS(edge);
    /*
    final edgeTwin = Edge(source, destination, paint: paint);
    addEdgeS(edgeTwin);
     */
    return edge;
  }
}
