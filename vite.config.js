import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

function routes(server) {
  server.middlewares.use((request, response, next) => {
    const url = new URL(request.url, 'http://localhost')
    if (/^\/v[12]\/?$/.test(url.pathname)) {
      request.url = url.pathname.replace(/\/$/, '') + '/index.html' + url.search
    } else if ((/^\/v\d+(?:\/|$)/.test(url.pathname) && !/^\/v[12](?:\/|$)/.test(url.pathname)) || /^\/minimal(?:\/|$)/.test(url.pathname)) {
      response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' })
      response.end('Stran ne obstaja.')
      return
    }
    next()
  })
}
export default defineConfig({
  plugins: [vue(), { name: 'minimal-routes', configureServer: routes, configurePreviewServer: routes }],
  build: {
    rollupOptions: {
      input: ['index.html', 'v1/index.html', 'v2/index.html'].map(path => fileURLToPath(new URL(path, import.meta.url))),
    },
  },
})
