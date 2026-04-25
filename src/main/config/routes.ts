import { type Express, Router } from 'express'
import { readdirSync } from 'node:fs'
import path from 'node:path'

export default async (app: Express): Promise<void> => {
  const router = Router()
  app.use('/api', router)

  const routesPath = path.resolve(__dirname, '..', 'routes')
  const files = readdirSync(routesPath).filter(
    (file) => !file.includes('.test.') && (file.endsWith('.ts') || file.endsWith('.js')),
  )

  await Promise.all(
    files.map(async (file) => {
      const routeModule = await import(path.join(routesPath, file))
      if (typeof routeModule.default === 'function') {
        routeModule.default(router)
      }
    }),
  )
}
