FROM node:22-alpine AS dependencies
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --ignore-scripts

FROM node:22-alpine AS development
WORKDIR /app

ENV NODE_ENV=development

COPY --from=dependencies /app/node_modules ./node_modules
COPY package.json yarn.lock ./

EXPOSE 5050 9222

CMD ["yarn", "start:dev"]

FROM node:22-alpine AS build
WORKDIR /app

COPY --from=dependencies /app/node_modules ./node_modules
COPY . .
RUN yarn build

FROM node:22-alpine AS production
WORKDIR /app

ENV NODE_ENV=production

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production --ignore-scripts && yarn cache clean

COPY --from=build /app/dist ./dist

EXPOSE 5050

CMD ["node", "dist/main/server.js"]
