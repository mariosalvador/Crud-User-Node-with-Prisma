import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { prisma } from "./lib/prisma";


export const GetUser = async (app: FastifyInstance) => {
    app.withTypeProvider<ZodTypeProvider>().get('/user', {}, async (request) => {
        
        const getUser = await prisma.user.findMany();

        return { allUser: getUser }
    })
}