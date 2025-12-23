# EUA Afora 🌎 (Around the U.S.)

## 📝 Descrição do Projeto

O **EUA Afora** é uma plataforma interativa desenvolvida em **React** que permite aos usuários compartilhar fotos e experiências de viagens pelos Estados Unidos. Este projeto consolida a transição de JavaScript puro para uma arquitetura moderna baseada em componentes, focando em reatividade e escalabilidade.

Nesta etapa atual do desenvolvimento, o foco principal foi a implementação de **fluxos de autenticação, autorização e proteção de rotas**, garantindo uma aplicação segura onde apenas usuários registrados podem interagir com a galeria de fotos.

---

## ✨ Novidades da Sprint: Autenticação e Segurança

A aplicação agora conta com um sistema completo de gerenciamento de acesso:

- **Sistema de Login e Registro:** Implementação das rotas `/signin` e `/signup`.
- **Rotas Protegidas (`ProtectedRoute`):** A rota raiz (`/`) e as funcionalidades de edição são exclusivas para usuários autenticados. Usuários não autorizados são automaticamente redirecionados para o login.
- **Gestão de Sessão (JWT):** Utilização de JSON Web Tokens armazenados no `localStorage` para persistência da sessão.
- **Feedback Visual (`InfoTooltip`):** Modais que informam ao usuário se o cadastro ou login foi realizado com sucesso ou se houve algum erro.
- **Cabeçalho Dinâmico:** O `Header` adapta-se conforme o estado de autenticação, exibindo o e-mail do usuário e opções de navegação.

---

## 🚀 Funcionalidades Principais

✅ **Gerenciamento de Cartões (CRUD):** Adição, visualização, curtidas e exclusão de fotos interativas.  
✅ **Edição de Perfil:** Atualização de nome, descrição e avatar do usuário através de modais.  
✅ **Autenticação de Usuário:** Registro e login integrados via API.  
✅ **Experiência do Usuário (UX):** Uso de estados de carregamento e validações de formulário.  
✅ **Responsividade Total:** Design adaptável para dispositivos móveis, tablets e desktops.

---

## 🛠️ Tecnologias e Boas Práticas

| Categoria       | Tecnologia / Ferramenta  | Descrição                                                 |
| :-------------- | :----------------------- | :-------------------------------------------------------- |
| **Framework**   | **React**                | Construção de UI declarativa baseada em componentes.      |
| **Roteamento**  | **React Router**         | Gerenciamento de navegação SPA e segurança de rotas.      |
| **Comunicação** | **Fetch API**            | Integração com back-end via métodos REST e Bearer Tokens. |
| **Hooks**       | **useState / useEffect** | Controle de estado global e sincronização com a API.      |
| **Estilização** | **CSS Modular / BEM**    | Estilos encapsulados para evitar conflitos globais.       |

---

## 🏗️ Integração com a API

A lógica de autenticação foi centralizada no módulo `src/utils/auth.js`, conectando-se ao back-end da TripleTen:

- **URL Base:** `https://se-register-api.en.tripleten-services.com/v1`
- **Endpoints:**
  - `POST /signup`: Registro de novos usuários.
  - `POST /signin`: Login e geração de token JWT.
  - `GET /users/me`: Validação de token e recuperação de dados do usuário.

> [!IMPORTANT]
> Para garantir a segurança, todas as requisições de dados agora incluem o cabeçalho `Authorization: Bearer {token}`.

---

## 🧠 Desafios Enfrentados

A maior complexidade desta etapa foi coordenar o **ciclo de vida dos componentes** com a persistência do token. Garantir que o aplicativo verifique a validade do usuário no `localStorage` assim que carrega (via `useEffect`) foi essencial para evitar que o usuário precisasse fazer login a cada atualização de página.

---

## 🔗 Visite o Site ao Vivo

Você pode testar a aplicação no link abaixo:

👉 [**EUA Afora - Live Demo**](https://web-project-around-auth-nu.vercel.app/signin)
