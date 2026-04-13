import Fastify from 'fastify';
import authRoutes from './routes/auth/auth.js'

const fastify = Fastify({
    logger: true
})

fastify.register(authRoutes, { prefix: "/auth" })

fastify.listen({port:3000}, (err, address) => {
    if (err)
        throw err;
})