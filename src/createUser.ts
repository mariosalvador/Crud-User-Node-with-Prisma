import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "./lib/prisma";


export const CreateUser = async (app: FastifyInstance) => {
    app.withTypeProvider<ZodTypeProvider>().post('/user/create', {
        schema: {
            body: z.object({
                name: z.string().min(3),
                email: z.string().email('Invalid email'),
                born: z.coerce.date(),
                password: z.string().min(5)
            })
        }
    }, async (request) => {
        const { name, email, born, password } = request.body;
        const user = await prisma.user.create({
            data: {
                name: name,
                email: email,
                born: born,
                password: password
            }
        })
        return { userId: user.id }
    });
}