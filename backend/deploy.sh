docker build -t gif-backend .
docker stop gif-backend || true
docker rm gif-backend || true

docker run -d --name gif-backend \
  --env-file .env.prod \
  -p 3000:3000 \
  gif-backend