import cors from "@fastify/cors";
import fastify from "fastify";
import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";


require('dotenv').config();

const app = fastify();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(cors,{
    origin:"*"
})


const port= process.env.SERVER_PORT;

app.listen({port:Number(port)}).then(()=>{
    console.log(`Servidor Rodando...`);
})