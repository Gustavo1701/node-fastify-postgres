const Fastify = require('fastify');

const appRoute = require('./src/home') 

function createServer() {
    const fastify = Fastify({
        logger:true,
    });
    
    fastify.register(appRoute);

    return fastify;
}

module.exports = createServer;