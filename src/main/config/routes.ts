import { type Express, Router } from 'express'
import fg from 'fast-glob'

export default (app: Express): void => {
  const routes = Router()
  app.use('/api', routes)

  const files = fg.sync('**/main/routes/**routes.@(ts|js)')
  void Promise.all(
    files.map(async (file) => {
      const normalizedFile = file.replaceAll('\\', '/')
      const route = (await import(`../../../${normalizedFile}`)).default
      route(routes)
    }),
  )
}
