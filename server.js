import { fastify } from 'fastify';
import { pool } from './db.js'; 

const server = fastify();

// Rota para consultar a hora no banco de dados
server.get('/pasteis', async (req, res) => {
    try {
        const consulta = await pool.query('SELECT * FROM pastel'); 

        res.send({
            menssage: 'Retornou pasteis',
            qtd: consulta.rowCount,
            data: consulta.rows, // Aqui você usa consulta.rows, que contém os dados retornados
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
