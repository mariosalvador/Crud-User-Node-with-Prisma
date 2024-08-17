import cors from "@fastify/cors";
import fastify from "fastify";

const app = fastify();

app.register(cors,{
    origin:"*"
})





app.listen({port:8080}).then(()=>{
    console.log('Servidor Rodando...');
})