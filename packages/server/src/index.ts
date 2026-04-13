import Fastify from 'fastify';
import registerUser from './routes/auth/register-user.js'

const fastify = Fastify({
    logger: true
})

fastify.register(registerUser, {
    prefix: "/auth"
});

fastify.listen({port:3000}, (err, address) => {
    if (err)
        throw err;
})