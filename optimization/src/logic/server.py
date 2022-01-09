import json
import sys

import logic


def run_server():
    import socket

    host = '127.0.0.1'  # Standard loopback interface address (localhost)
    port = 5800  # Port to listen on (non-privileged ports are > 1023)

    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.bind((host, port))
        s.listen()
        print(f"Listening on port {5800}")
        while True:
            conn, address = s.accept()
            with conn:
                print('Connected by', address)
                data = conn.recv(1024)
                if data:
                    conn.sendall(data)
                    data = json.loads(data)
                    metrics = []

                    if 'optimization-parameters' not in data.keys():
                        print(f"Request not well formed")
                        conn.close()
                        continue

                    if 'weight' in data['optimization-parameters'] and 'work' not in data['optimization-parameters']:
                        metrics.append('weight')

                    if 'organization' in data['optimization-parameters']:
                        metrics.append('sector')

                    if 'work' in data['optimization-parameters'] and 'weight' not in data['optimization-parameters']:
                        metrics.append('work')

                    if 'frequency' in data['optimization-parameters']:
                        metrics.append('frequency')

                    if 'minimize-errors' in data['optimization-parameters']:
                        metrics.append('minimize-errors')

                    if 'windows' in data['optimization-parameters']:
                        metrics.append('windows')

                    if len(sys.argv) > 1 and sys.argv[1] == 'docker':
                        logic.main(True, metrics)
                    else:
                        logic.main(False, metrics)

            conn.close()


if __name__ == '__main__':
    run_server()
