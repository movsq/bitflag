import type { FastifyInstance, FastifyPluginOptions } from "fastify";
import registerUser from './register-user.js'
import loginUser from './login-user.js'

async function authRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {
    fastify.register(registerUser);
    fastify.register(loginUser);
}

export default authRoutes