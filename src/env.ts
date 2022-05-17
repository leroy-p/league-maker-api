const common = {
  // TODO: No longer use 'isX' constants
  isLocal: false,
  isTest: false,
  isStaging: false,
  isLive: false,
  isDev: false,
  isProd: false,
  client: {
    protocol: process.env.CLIENT_PROTOCOL,
    host: process.env.CLIENT_HOST,
    port: process.env.CLIENT_PORT,
    url: process.env.CLIENT_URL,
  },
  database: {
    url: process.env.DATABASE_URL,
    synchronize: true,
    prismaPath:
      process.env.APP_ENV === 'local'
        ? '../../node_modules/prisma/build/index.js'
        : `./node_modules/prisma/build/index.js`,
  },
  server: {
    type: process.env.SERVER_TYPE,
    protocol: process.env.SERVER_PROTOCOL,
    host: process.env.SERVER_HOST || '0.0.0.0',
    port: (process.env.SERVER_PORT && Number.parseInt(process.env.SERVER_PORT)) || 3000,
    listenPort: (process.env.PORT && Number.parseInt(process.env.PORT)) || 3000,
    url: process.env.SERVER_URL,
  },
}

export const env = { ...common }