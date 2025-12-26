# Around US – Projeto Fullstack

Aplicação completa desenvolvida durante o bootcamp Around US.

O projeto consiste em uma plataforma onde usuários podem se cadastrar, fazer login e interagir com cartões: criar, curtir e excluir. Também é possível editar perfil e avatar.

---

## 🌐 Deploy

- **Frontend (Vercel):** <https://web-project-api-full-frontend.vercel.app/signin>
- **Backend (Render):** <https://web-project-api-full-backend.onrender.com>

---

## ✨ Funcionalidades

### 👤 Usuários

- Registro com validação
- Login com autenticação via JWT
- Autorização protegendo rotas privadas
- Atualização de perfil (nome e descrição)
- Atualização de avatar

### 🃏 Cartões

- Listagem de cartões
- Criação de novos cartões
- Curtir / descurtir cartões
- Exclusão de cartões (apenas proprietário)

---

## 🛠️ Tecnologias Utilizadas

### Frontend

- React
- Vite
- Context API / Hooks
- Fetch / integração com API
- Validação de formulários
- Deploy na **Vercel**

### Backend

- Node.js
- Express
- MongoDB Atlas + Mongoose
- Autenticação com **JWT**
- Validação com **celebrate / Joi**
- Testes com **Jest e Supertest**
- Nodemon para desenvolvimento
- Logger com **Winston**
- Deploy no **Render**
