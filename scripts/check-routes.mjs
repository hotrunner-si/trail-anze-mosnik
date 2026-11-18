import assert from 'node:assert/strict'
import { createServer, preview } from 'vite'

for (const mode of ['development', 'production']) {
  const server = mode === 'development'
    ? await createServer({ server: { host: '127.0.0.1', port: 5187, strictPort: true } })
    : await preview({ preview: { host: '127.0.0.1', port: 5187, strictPort: true } })
  if (mode === 'development') await server.listen()
  try {
    for (const [path, version] of [['/', 'v1'], ['/v1', 'v0'], ['/v1/', 'v0'], ['/v2', 'v2'], ['/v2/', 'v2']]) {
      const response = await fetch('http://127.0.0.1:5187' + path)
      assert.equal(response.status, 200, path)
      assert.match(await response.text(), new RegExp(`data-version="${version}"`))
    }
    for (const path of ['/v3', '/v4/', '/v5', '/minimal/v1']) {
      assert.equal((await fetch('http://127.0.0.1:5187' + path)).status, 404, path)
    }
    console.log(mode + ': all three pages and removed routes passed')
  } finally {
    if (mode === 'development') await server.close()
    else await new Promise(resolve => server.httpServer.close(resolve))
  }
}
