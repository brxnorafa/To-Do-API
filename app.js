const express = require('express');
const app = express();
const port = 3000;

// Middleware para JSON e URL encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Importar rotas de tarefas
const taskRoutes = require('./routes/taskRoutes');
app.use('/api/tasks', taskRoutes);

// Iniciar o servidor
app.listen(port, () => {
    console.log(`API TO-DO rodando em ${port}`);
});
