import type { FastifyInstance, FastifyPluginOptions } from "fastify";
import type { RegisterBody } from "@bitflag/shared";
import { eq } from "drizzle-orm";
import { password } from "bun";
import zod from "zod";

import db from "./db/index.js";
import { users } from "./db/schema.js";

type NewUser = typeof users.$inferInsert;

async function AuthRoutes(
    fastify: FastifyInstance,
    options: FastifyPluginOptions) {
    
        fastify.post<{ Body: RegisterBody }>("/register", async(request, reply) => {
            const { reqEmail, reqPassword } = request.body;

            const is_email_valid:boolean = reqEmail != undefined && zod.email().safeParse(reqEmail).success;
            const is_password_valid:boolean = reqPassword != undefined && zod.string().min(8).max(255).safeParse(reqPassword).success;

            const validationErrors:string[] = [];

            if (!is_email_valid) {
                validationErrors.push("Invalid e-mail");
            }

            if (!is_password_valid) {
                validationErrors.push("Password must be between 8 and 255 characters");
            }

            if (validationErrors.length > 0) {
                await reply.status(400).send(validationErrors.join("\n"));
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
            
            return reply.status(200).send("Success");

        })
}


export default AuthRoutes;