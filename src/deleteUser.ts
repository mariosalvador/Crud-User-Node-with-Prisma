import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "./lib/prisma";


export const DeleteUser= async (app: FastifyInstance)=>{
    app.withTypeProvider<ZodTypeProvider>().delete('/user/:userId/delete',{
        schema:{
            params:z.object({
                userId: z.string().uuid()
            })
        }
    },async(request)=>{
        const {userId} = request.params

        const findUser = await prisma.user.delete({
            where:{id:userId}
        })

        if(!findUser) return new Error('User Not Found!!!');

        return {delete:"Deleted User"}
    })
}