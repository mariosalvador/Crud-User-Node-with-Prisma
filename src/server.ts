import cors from "@fastify/cors";
import fastify from "fastify";
import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
import { CreateUser } from "./createUser";
import { GetUser } from "./getUser";
import { PutUser } from "./putUser";
import { GetUniqueUser } from "./getUniqueUser";


require('dotenv').config();
const port= process.env.SERVER_PORT;

const app = fastify();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(cors,{
    origin:"*"
})

app.register(CreateUser)
app.register(GetUser)
app.register(GetUniqueUser)
app.register(PutUser)


app.listen({port:Number(port)}).then(()=>{
    console.log(`Servidor Rodando...`);
})