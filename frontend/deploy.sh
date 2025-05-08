
export $(cat .env.prod | xargs)

docker build --build-arg VITE_BASE_BE_URL=$VITE_BASE_BE_URL \
  -t gif-frontend .

docker stop gif-frontend || true
docker rm gif-frontend || true

docker run -d --name gif-frontend -p 80:80 gif-frontend