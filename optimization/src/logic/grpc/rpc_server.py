import grpc
import futures

import ga_pb2_grpc
import ga_pb2

class GeneticAlgorithmServicer(ga_pb2_grpc.GeneticAlgorithmServicer):
  def GenerateLayout(self, request, context):
    print("Received Request: " +  request.metrics)
    return ga_pb2.LayoutReply(layouts = "received")

def serve():
  server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
  ga_pb2_grpc.add_GeneticAlgorithmServicer_to_server(
      ga_pb2_grpc.GeneticAlgorithmServicer(), server)
  server.add_insecure_port('[::]:50051')
  server.start()
  server.wait_for_termination()

serve()
