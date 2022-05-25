"use strict";

var _bcryptjs = require("bcryptjs");

var _supertest = _interopRequireDefault(require("supertest"));

var _typeorm = require("typeorm");

var _uuid = require("uuid");

var _app = require("../../../../shared/infra/http/app");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let connection;
describe("Create Category Controller", () => {
  beforeAll(async () => {
    connection = await (0, _typeorm.createConnection)();
    await connection.runMigrations();
    const id = (0, _uuid.v4)();
    const password = await (0, _bcryptjs.hash)("admin", 8);
    await connection.query(`
      INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license )
         values('${id}', 'admin', 'admin@rentx.com.br', '${password}', true, 'now()', 'XXXXXXXX')
      `);
  });
  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });
  it("should be able to create a new category", async () => {
    const responseToken = await (0, _supertest.default)(_app.app).post("/session").send({
      email: "admin@rentx.com.br",
      password: "admin"
    });
    const {
      token
    } = responseToken.body;
    const response = await (0, _supertest.default)(_app.app).post("/categories").send({
      name: "Category Supertest",
      description: "Category Supertest"
    }).set({
      Authorization: `Bearer ${token}`
    });
    expect(response.status).toBe(201);
  });
  it("should not be able to create a new category with name exists", async () => {
    const responseToken = await (0, _supertest.default)(_app.app).post("/session").send({
      email: "admin@rentx.com.br",
      password: "admin"
    });
    const {
      token
    } = responseToken.body;
    const response = await (0, _supertest.default)(_app.app).post("/categories").send({
      name: "Category Supertest",
      description: "Category Supertest"
    }).set({
      Authorization: `Bearer ${token}`
    });
    expect(response.status).toBe(400);
  });
});