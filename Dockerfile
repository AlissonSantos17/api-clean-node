FROM node:22-alpine AS dependencies
WORKDIR /app

RUN corepack enable

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

FROM node:22-alpine AS build
WORKDIR /app

RUN corepack enable

COPY --from=dependencies /app/node_modules ./node_modules
COPY . .
RUN yarn build

FROM node:22-alpine AS production
WORKDIR /app

ENV NODE_ENV=production

RUN corepack enable

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production=true && yarn cache clean

COPY --from=build /app/dist ./dist

EXPOSE 5050

CMD ["node", "dist/main/server.js"]
