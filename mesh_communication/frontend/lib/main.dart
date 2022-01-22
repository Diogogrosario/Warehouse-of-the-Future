import 'package:flutter/material.dart';
import 'package:meshcommunication/RequestHandler/request_handler.dart';
import 'package:meshcommunication/mesh_communication.dart';

void main({RequestHandler? requestHandler}) {
  runApp(
    MeshCommunication(
      requestHandler: requestHandler,
    ),
  );
}
