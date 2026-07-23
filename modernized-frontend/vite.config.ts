import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    host: true,
    port: 5173
  },
  plugins: [
    {
      name: 'root-redirect',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url === '/') req.url = '/index.html'
          next()
        })
      }
    }
  ]
})