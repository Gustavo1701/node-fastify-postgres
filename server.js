import { fastify } from 'fastify';
import { pool } from './db.js'; 

const server = fastify();

// Rota para consultar a hora no banco de dados
server.get('/pastel', async (req, res) => {
    try {
        const consulta = await pool.query('SELECT * FROM pastel'); 

        res.send({
            menssage: 'Retornou pasteis',
            data: consulta.rows,
        });

    } catch (err) {
        res.status(500).send('Erro ao consultar o banco de dados.');
    }
});


// Inicializa o servidor
server.listen({ port: 3000 }).then(() => {
    console.log(`Servidor rodando na porta: 3000`);
}).catch(err => {
    console.error(err);
    process.exit(1);
});
