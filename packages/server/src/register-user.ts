import type { FastifyInstance, FastifyPluginOptions } from "fastify";
import type { RegisterBody } from "@bitflag/shared";
import { eq } from "drizzle-orm";
import { password } from "bun";

import db from "./db/index.js";
import { users } from "./db/schema.js";

type NewUser = typeof users.$inferInsert;

async function routes(
    fastify: FastifyInstance,
    options: FastifyPluginOptions) {
    
        fastify.post<{ Body: RegisterBody }>("/register", async(request, reply) => {
            const { reqEmail, reqPassword } = request.body;

            if (reqEmail == null || reqPassword == null) {
                await reply.status(400).send("E-mail and password are required");
                return;
            }

            const valid_email = reqEmail.includes("@") == true && reqEmail.length < 256;
            if (!valid_email) {
                await reply.status(400).send("Invalid e-mail");
                return;
            }

            const valid_password = reqPassword.length >= 8 && reqPassword.length < 256;
            if (!valid_password) {
                await reply.status(400).send("Invalid password");
                return;
            }

            const result = await db.select().from(users).where(eq(users.email, reqEmail));
            if (result.length > 0) {
                await reply.status(400).send("E-mail already in use");
                return;
            }

            const hashedPassword = await password.hash(reqPassword);

            const newUser : NewUser = {email : reqEmail, passwordHash : hashedPassword};
            await db.insert(users).values(newUser);

            console.log(request.body);

            return reply.status(200).send("Success");

        })

}


export default routes;