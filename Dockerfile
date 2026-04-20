FROM node:22-alpine AS dependencies
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

FROM node:22-alpine AS build
WORKDIR /app

COPY --from=dependencies /app/node_modules ./node_modules
COPY . .
RUN yarn build

FROM node:22-alpine AS production
WORKDIR /app

ENV NODE_ENV=production

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production && yarn cache clean

COPY --from=build /app/dist ./dist

EXPOSE 5050

CMD ["node", "dist/main/server.js"]
