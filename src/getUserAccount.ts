import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";


export const GetUserAccount = async (app: FastifyInstance)=>{
    app.withTypeProvider<ZodTypeProvider>().get('/user',{},async ()=>{})
}