export const env = {
  port: process.env.PORT ?? 5050,
  mongoUrl: process.env.MONGO_URL ?? 'mongodb://localhost:27017/clean-node-api',
  jwtSecret: process.env.JWT_SECRET ?? 'tjd+@aa1ld==1',
}
