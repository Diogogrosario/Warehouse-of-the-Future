#!/bin/sh

cd /app || exit 1

PORT=4040

echo "Cleaning port ${PORT}..."
fuser -k 4040/tcp

python3 -m http.server "$PORT"
