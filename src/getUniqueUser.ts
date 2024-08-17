import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "./lib/prisma";


export const GetUniqueUser = async(app: FastifyInstance)=>{
    app.withTypeProvider<ZodTypeProvider>().get('/user/:userId',{
        schema:{
            params:z.object({
                userId: z.string().uuid()
            })
        }
    },async (request)=>{
            const {userId} = request.params;

            const findUser = await prisma.user.findUnique({
                where:{id:userId},
            })

            if(!findUser) return new Error('User Not Found!!!');

            const getUser = await prisma.user.findUnique({
                select:{
                    name:true,
                    born:true,
                    email:true
                },
                where:{
                    id:userId
                },
            })

            return{user:getUser}
    })
}