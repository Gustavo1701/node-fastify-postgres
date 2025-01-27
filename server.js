import { fastify } from 'fastify';
import { pool } from './db.js'; 

const server = fastify();

// Rota para consultar a hora no banco de dados
server.get('/pasteis', async (req, res) => {
    try {
        const consulta = await pool.query('SELECT * FROM pastel'); 

        res.send({
            message: 'Retornou pasteis',
            qtd: consulta.rowCount,
            data: consulta.rows, // Aqui você usa consulta.rows, que contém os dados retornados
        });

    } catch (err) {
        res.status(500).send('Erro ao consultar o banco de dados.');
    }
});

//Rota para consultar um pastel especifico por ID
server.get('/pasteis/:id', async(req, res) => {
    const {id} = req.params; 

    try{
        const consulta = await pool.query('SELECT * FROM pastel WHERE id = $1', [id]);

        if(consulta.rowCount === 0){
            return res.status(404).send({message: 'Pastel não encontrado.'})
        } 

        res.send({
            message: 'Retornou Pastel',
            data: consulta.rows[0],
        });
    } catch (err){
        res.status(500).send('Erro ao consultar banco de dados.');
    }
});

//Rota para criar um pastel
server.post('/teste', async (req, res) => {
    console.log("Recebendo requisição POST para /pasteis/post");
    const { nome, sabor, tamanho, valor, viagem, img } = req.body;

    try {
        const resultado = await pool.query(
            'INSERT INTO pastel (nome, sabor, tamanho, valor, viagem, img) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [nome, sabor, tamanho, valor, viagem, img]
        );

        res.status(201).send({
            message: 'Pastel criado com sucesso',
            data: resultado.rows[0],
        });

    } catch (err) {
        console.error("[ERRO] Falha ao criar pastel:", err);
        res.status(500).send({
            message: 'Erro ao criar pastel.',
            error: err.message,
            stack: err.stack
        });
    }
});

// Rota para atualizar um pastel (PUT)
server.put('/pasteis/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, sabor, tamanho, valor, img, viagem } = req.body;

    try {
        const resultado = await pool.query(
            'UPDATE pastel SET nome = $1, sabor = $2, tamanho = $3, valor = $4, img = $5, viagem = $6 WHERE id = $7 RETURNING *',
            [nome, sabor, tamanho, valor, img, viagem, id]
        );

        if (resultado.rowCount === 0) {
            return res.status(404).send({ message: 'Pastel não encontrado para atualizar.' });
        }

        res.send({
            message: 'Pastel atualizado com sucesso',
            data: resultado.rows[0],
        });

    } catch (err) {
        res.status(500).send('Erro ao atualizar o pastel.');
    }
});

// Rota para excluir um pastel (DELETE)
server.delete('/pasteis/delete/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const resultado = await pool.query('DELETE FROM pastel WHERE id = $1 RETURNING *', [id]);

        if (resultado.rowCount === 0) {
            return res.status(404).send({ message: 'Pastel não encontrado para excluir.' });
        }

        res.send({
            message: 'Pastel excluído com sucesso',
            data: resultado.rows[0],
        });

    } catch (err) {
        res.status(500).send('Erro ao excluir o pastel.');
    }
});

// Inicializa o servidor
server.listen({ port: 3000 }).then(() => {
    console.log(`Servidor rodando na porta: 3000`);
}).catch(err => {
    console.error(err);
    process.exit(1);
});
