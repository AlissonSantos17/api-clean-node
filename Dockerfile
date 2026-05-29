FROM node:22-alpine AS base
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@10.22.0 --activate

FROM base AS dependencies

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --ignore-scripts

FROM base AS development
WORKDIR /app

ENV NODE_ENV=development

COPY --from=dependencies /app/node_modules ./node_modules
COPY package.json pnpm-lock.yaml ./

EXPOSE 5050 9222

CMD ["pnpm", "start:dev"]

FROM base AS build
WORKDIR /app

COPY --from=dependencies /app/node_modules ./node_modules
COPY . .
RUN pnpm build

FROM base AS production
WORKDIR /app

ENV NODE_ENV=production

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --prod --ignore-scripts && pnpm store prune

COPY --from=build /app/dist ./dist

EXPOSE 5050

CMD ["node", "dist/main/server.js"]
