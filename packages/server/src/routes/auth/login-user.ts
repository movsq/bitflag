import type { FastifyInstance, FastifyPluginOptions } from "fastify";
import type { LoginBody } from "@bitflag/shared/src/types/auth.js";
import { eq } from "drizzle-orm";
import { password } from "bun";
import zod from "zod";

import db from "../../db/index.js";
import { users } from "../../db/schema.js";

async function AuthRoutes(
    fastify: FastifyInstance,
    options: FastifyPluginOptions) {
    
        fastify.post<{ Body: LoginBody }>("/login", async(request, reply) => {
            const { reqEmail, reqPassword } = request.body;

            const isEmailValid:boolean = reqEmail != undefined && zod.email().safeParse(reqEmail).success;
            const isPasswordValid:boolean = reqPassword != undefined && zod.string().min(8).max(255).safeParse(reqPassword).success;

            if (!isEmailValid || !isPasswordValid) {
                await reply.status(400).send("Invalid e-mail or password");
                return;
            }

            const result = await(db.select().from(users).where(eq(users.email, reqEmail)));
            const user = result[0];

            if (!user || !(await password.verify(reqPassword, user.passwordHash))) {
                await reply.status(400).send("Invalid e-mail or password");
                return;
            }

            return reply.status(200).send("Login: success");
        })
}


export default AuthRoutes;