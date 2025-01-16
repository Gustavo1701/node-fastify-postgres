async function routes(fastify, options) {
    fastify.get('/', async (request, reply) => {
      return { message: 'Olá, Servidor Rodando!' };
    });
  }
  
  module.exports = routes;
  