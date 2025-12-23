const supertest = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const { responseWhitelist } = require("express-winston");

const request = supertest(app);

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI_TEST);
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe("Testes de autenticação", () => {
  test("Deve registrar um novo usuário", async () => {
    const response = await request.post("/signup").send({
      email: "test5@gmail.com",
      password: "123456",
      name: "Test User",
    });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("Usuário criado com sucesso");
  });

  test("Deve falhar no login com credenciais inválidas", async () => {
    const response = await request.post("/signin").send({
      email: "test@gmail.com",
      password: "12345",
    });

    expect(response.status).toBe(401);
  });
  test("Deve logar com sucesso", async () => {
    const response = await request.post("/signin").send({
      email: "test5@gmail.com",
      password: "123456",
    });

    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
  });
});
