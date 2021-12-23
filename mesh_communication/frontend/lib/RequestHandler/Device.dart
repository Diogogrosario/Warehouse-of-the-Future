import 'package:flutter/material.dart';
import 'package:vector_math/vector_math.dart' as vm;

class Device {
  final int id;
  final vm.Vector3 pos;

  const Device({Key? key, required this.id, required this.pos});
}
