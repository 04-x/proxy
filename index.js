const fastify = require('fastify')({ logger: false })
const proxy = require('@fastify/http-proxy')
const cors = require('@fastify/cors')

const PORT = process.env.PORT || 4201

fastify.register(cors, {
  origin: process.env.ORIGIN || '*',
})

fastify.register(proxy, {
  upstream: 'https://api.anthropic.com/v1/complete',
  prefix: '/anthropic/v1/complete',
  http2: false,
})

fastify.get('/', async (req, reply) => {
  reply.send({ ok: 1 })
})

fastify.listen({ port: PORT, host: '0.0.0.0' }, function (err, address) {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`✅ Ready for proxying`)
})
