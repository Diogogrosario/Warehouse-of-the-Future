import 'package:flutter_gherkin/flutter_gherkin.dart';
import 'package:meshcommunication/RequestHandler/request_handler_mock.dart';

class CustomWorld extends FlutterWidgetTesterWorld {
  RequestHandlerMock? _requestHandler;

  RequestHandlerMock get requestHandler => _requestHandler!;

  void setRequestHandler(RequestHandlerMock requestHandler) {
    _requestHandler = requestHandler;
  }
}
