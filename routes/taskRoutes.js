const express = require('express');
const router = express.Router();
const db = require('../config/db');

// criar nova tarefa
router.post('/', async (req, res) => {
    const { title, description } = req.body;

    if (!title || !description) {
        return res.status(400).json({ message: 'Título e descrição são obrigatórios.' });
    }

    try {
        const connection = await db.getConnection();
        const [result] = await connection.execute(
            'INSERT INTO tasks (title, description, status, created_at, updated_at) VALUES (?,?,?,NOW(),NOW())',
            [title, description, 'pendente']
        );
        await connection.end();

        res.status(201).json({ id: result.insertId, title, description, status: 'pendente' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar a tarefa.', error });
    }
})

// listar todas as tarefas
router.get('/', async (req, res) => {
    try {
        const connection = await db.getConnection();
        const [tasks] = await connection.execute('SELECT * FROM tasks');
        await connection.end();

        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao listar as tarefas.', error });
    }
});

// detalhar uma tarefa
router.get('/:id', async (req, res) => {
    try {
        const connection = await db.getConnection();
        const [tasks] = await connection.execute('SELECT * FROM tasks WHERE id = ?', [req.params.id]);
        await connection.end();

        if (tasks.length === 0) {
            return res.status(404).json({ message: 'Tarefa não encontrada.' });
        }

        res.json(tasks[0]);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar a tarefa.', error });
    }
});

// atualizar uma tarefa
router.put('/:id', async (req, res) => {
    const { title, description, status } = req.body;
    try {
        const connection = await db.getConnection();
        const [tasks] = await connection.execute(
            'UPDATE tasks SET title = ?, description = ?, status = ?, updated_at = NOW() WHERE id = ?',
            [title, description, status, req.params.id]
        );
        await connection.end();

        res.json({ message: 'Tarefa atualizada com sucesso.' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar a tarefa.', error });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const connection = await db.getConnection();
        await connection.execute('DELETE FROM tasks WHERE id = ?', [req.params.id]);
        await connection.end();

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Erro ao excluir a tarefa.', error });
    }
});

module.exports = router;