import { fastify } from 'fastify'

const server = fastify();

server.get('/', () => {
    return('Servidor rodando.')
});

server.listen({
    port:3000,
});