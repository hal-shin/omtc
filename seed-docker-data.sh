#!/usr/bin/env bash
# Copies local prod data (SQLite DB + media) into Docker volumes.
# Run this ONCE before the first `docker compose up`.

set -euo pipefail

COMPOSE_PROJECT=$(basename "$(pwd)")

echo "Starting temporary container to copy data..."
docker compose up --no-start

# Copy SQLite database
echo "Copying database..."
docker compose cp ./data/payload.db web:/app/data/payload.db

# Copy media files
echo "Copying media files..."
for f in media/*; do
  [ -e "$f" ] || continue
  docker compose cp "$f" "web:/app/media/$(basename "$f")"
done

echo "Done! You can now run: docker compose up -d"
