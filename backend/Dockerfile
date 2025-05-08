FROM node:slim AS build

WORKDIR /app
COPY package*.json tsconfig.json ./
RUN npm i
COPY . .
RUN npm run build

FROM node:slim

RUN apt-get update && apt-get install -y curl

WORKDIR /app
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY package*.json ./

CMD ["node", "dist/index.js"]
