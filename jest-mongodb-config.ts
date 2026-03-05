import type { Config } from '@shelf/jest-mongodb/lib/types'

const config: Config = {
  mongodbMemoryServerOptions: {
    instance: {
      dbName: 'jest',
    },
    binary: {
      version: '7.1.0',
    },
  },
}

export default config
