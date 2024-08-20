import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "./lib/prisma";


export const PutUser = async(app: FastifyInstance)=>{
    app.withTypeProvider<ZodTypeProvider>().put('/user/:userId/update',{
        schema:{
            params: z.object({
                userId: z.string().uuid(),
            }),
            body: z.object({
                name:z.string().min(3),
                email:z.string().email('Invalid email!'),
                born: z.coerce.date(),
                password: z.string().min(8)
            })
        }
    }, async(request)=>{
        const {userId} = request.params;
        const {name,email,born,password} = request.body

        const findUser = await prisma.user.findUnique({
            where:{ id:userId}
        })

        if(!findUser) return new Error('User Not Found!!!');

        const putUser= await prisma.user.update({
            where:{
                id:userId,
            },
            data:{
                name:name,
                email:email,
                born:born,
                password:password
            }
        })
        return{userId:userId}
    })
}