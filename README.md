# API de CRUD de Tarefas (To-Do List)

Esta é uma API simples de CRUD (Create, Read, Update, Delete) para gerenciar tarefas em uma lista de "To-Do". A API foi desenvolvida com Node.js e MySQL para armazenar as tarefas.

## Tecnologias Utilizadas

- **Node.js**: Plataforma de JavaScript para o backend.
- **Express.js**: Framework para criar a API.
- **MySQL**: Banco de dados relacional para armazenar as tarefas.
- **MySQL2**: Biblioteca para interagir com o banco de dados MySQL usando Promises.

## Funcionalidades

- **Criar Tarefa**: Adiciona uma nova tarefa à lista.
- **Ler Tarefas**: Retorna todas as tarefas armazenadas.
- **Atualizar Tarefa**: Modifica uma tarefa existente.
- **Excluir Tarefa**: Remove uma tarefa da lista.

## Endpoints

### 1. Criar Tarefa
**POST** `/api/tasks`

Exemplo de request body:

```json
{
  "title": "Minha nova tarefa",
  "description": "Descrição da tarefa"
}
```

### 2. Listar Tarefas
**GET** `/api/tasks`

Este endpoint retorna todas as tarefas criadas na lista "To-Do".

#### Resposta de Sucesso (200 OK):
```json
[
  {
    "id": 1,
    "title": "Minha nova tarefa",
    "description": "Descrição da tarefa",
    "created_at": "2025-01-18T10:00:00Z"
  },
  {
    "id": 2,
    "title": "Outra tarefa",
    "description": "Descrição de outra tarefa",
    "created_at": "2025-01-18T11:00:00Z"
  }
]
```
### 3. Atualizar Tarefa
**PUT** `/api/tasks/:id`

Este endpoint permite atualizar uma tarefa existente com base no ID fornecido. Você deve fornecer o título, a descrição e o novo status (seguindo o ENUM do mysql) da tarefa.

#### Parâmetros:
- `id`: O ID da tarefa a ser atualizada. Deve ser passado como parâmetro na URL.

#### Exemplo de Request Body:
```json
{
  "title": "Tarefa atualizada",
  "description": "Nova descrição da tarefa",
   "status": "Novo status da tarefa"
}
```

### 4. Excluir Tarefa
**DELETE** `/api/tasks/:id`

Este endpoint permite excluir uma tarefa existente com base no ID fornecido.

#### Parâmetros:
- `id`: O ID da tarefa a ser excluída. Deve ser passado como parâmetro na URL.

#### Resposta de Sucesso (200 OK):
```json
{
  "message": "Task deleted successfully"
}
```

## Como Rodar

### Pré-requisitos

- **Node.js**: Certifique-se de ter o Node.js instalado. Se não tiver, baixe e instale [aqui](https://nodejs.org/).
- **MySQL**: Instale o MySQL em sua máquina. Para um ambiente mais simples, você pode utilizar ferramentas como XAMPP ou WAMP, que incluem o MySQL e o Apache em um único pacote.

### Passos para Rodar a API

1. **Instalar o XAMPP ou WAMP**:
   - Baixe e instale o XAMPP [aqui](https://www.apachefriends.org/index.html) ou o WAMP [aqui](http://www.wampserver.com/).
   - Após a instalação, inicie o **Apache** e o **MySQL** pelo painel de controle do XAMPP/WAMP.

2. **Criar o banco de dados**:
   - Abra o **phpMyAdmin** pelo painel de controle do XAMPP/WAMP e crie um banco de dados chamado `todo_db`.
   - Crie uma tabela `tasks` com os campos:
     - `id` (INT, AUTO_INCREMENT, PRIMARY KEY)
     - `title` (VARCHAR)
     - `description` (TEXT)
     - `status` (ENUM('pendente, 'em andamento', 'concluído'))
     - `created_at` (DATETIME)
     - `updated_at` (DATETIME)

3. **Configurar a API**:
   - Clone este repositório:
     ```bash
     git clone https://github.com/brxnorafa/To-Do-API.git
     ```
   - Navegue até o diretório do projeto:
     ```bash
     cd To-Do-API
     ```
   - Instale as dependências:
     ```bash
     npm install
     ```
   - No arquivo de configuração do banco de dados (`config/db.js`), altere as credenciais para conectar-se ao seu banco de dados MySQL (use o mesmo nome do banco `todo_db` que você criou).

4. **Iniciar o servidor**:
   - Execute o servidor:
     ```bash
     npm start
     ```
   - A API estará rodando em `http://localhost:3000`.
