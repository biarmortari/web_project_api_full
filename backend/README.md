# EUA Afora Express 🌎

## Descrição do Projeto

API RESTful do projeto **EUA Afora**, construída com **Node.js**, **Express** e **MongoDB/Mongoose**.  
Este backend gerencia usuários e cartões, permitindo criação, listagem, atualização de perfil/avatar e curtir/descurtir cards.

## 📌 Tecnologias Utilizadas

- Node.js
- Express
- MongoDB + Mongoose
- Nodemon
- ESLint (Airbnb Style Guide)

## Rotas da API

1. GET /cards — retorna todos os cards do banco de dados;
2. POST /cards — cria um card com nome e link passados no corpo da solicitação.
3. DELETE /cards/:cardId — deleta um card por \_id ;
4. PUT /cards/:cardId/likes — curte um card;
5. DELETE /cards/:cardId/likes — descurte um card.

## Tratamento de Erros

A API retorna os seguintes status:

### 400 — dados inválidos (ValidationError, CastError)

### 404 — usuário ou cartão não encontrado (DocumentNotFoundError)

### 500 — erro interno
