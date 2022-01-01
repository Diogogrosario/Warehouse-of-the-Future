import 'package:flutter_gherkin/flutter_gherkin.dart';
import 'package:meshcommunication/RequestHandler/request_handler.dart';

class CustomWorld extends FlutterWidgetTesterWorld {
  RequestHandler? _requestHandler;

  RequestHandler get requestHandler => _requestHandler!;

  void setRequestHandler(RequestHandler requestHandler) {
    _requestHandler = requestHandler;
  }
}
