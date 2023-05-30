import chai from "chai";
import supertest from "supertest";
const expect = chai.expect;
const requester = supertest("http://localhost:8080");
describe("Testing ArtFocus", () => {
  let authToken;
  let authTokenUser;
  let idProduct;
  let idCart;
  function extractTokenFromCookie(cookie) {
    const tokenRegex = /authToken=([^;]+)/;
    const match = tokenRegex.exec(cookie);

    if (match && match.length > 1) {
      return match[1];
    } else {
      return null;
    }
  }
  const product_types = {
    _id: "string",
    title: "string",
    description: "string",
    category: "string",
    thumbnail: "string",
    stock: "number",
    price: "number",
    code: "string",
    owner: "string",
  };

  const productMock = {
    title: "Mountains",
    description:
      "Philosophy against deceptions ascetic superiority reason merciful oneself deceptions convictions superiority. Intentions play decrepit derive right against dead christian morality.",
    price: 8000,
    thumbnail:
      "https://images.unsplash.com/photo-1522932753915-9ee97e43e3d9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80",
    stock: 40,
    category: "algo",
  };

  before(async () => {
    //ADMIN
    const admin = {
      email: "adminCoder@coder.com",
      password: "adminCod3r123",
    };
    const response = await requester.post("/auth").send(admin);
    const authTokenCookie = response.header["set-cookie"];
    authToken = extractTokenFromCookie(authTokenCookie);

    //USER
    //REGISTER
    const lala = {
      firstName: "lala",
      lastName: "lalita",
      age: 15,
      email: "lala@gmail.com",
      password: "qwerty",
    };
    await requester.post("/api/users").send(lala);
    //LOGIN
    const user = {
      email: "lala@gmail.com",
      password: "qwerty",
    };
    const userLogin = await requester.post("/auth").send(user);
    const authTokenCookieUser = userLogin.header["set-cookie"];
    authTokenUser = extractTokenFromCookie(authTokenCookieUser);
  });

  describe("Test Products", () => {
    it("Post /api/products must return status code 201", async () => {
      const { statusCode, created } = await requester
        .post("/api/products")
        .set("Authorization", `${authToken}`)
        .send(productMock);

      expect(statusCode).to.equal(201);
      expect(created).to.be.true;
    });
    it("POST /api/products must return status code 201", async () => {
      const { statusCode, created } = await requester
        .post("/api/products/populate")
        .set("Authorization", `${authToken}`);

      expect(statusCode).to.equal(201);
    });
    it("GET /api/products should return a status code of 200 and data with a payload that is an array of objects.", async () => {
      const { statusCode, body } = await requester.get("/api/products");
      expect(body.data.payload).to.be.an("array");
      expect(statusCode).to.equal(200);
      idProduct = body.data.payload[0].id;
    });
    it("GET /api/products/:pid should return a status code of 200 and object with product found", async () => {
      const { statusCode, body } = await requester.get(
        `/api/products/${idProduct}`
      );
      expect(body.data).to.be.an("object");
      expect(statusCode).to.equal(200);
      expect(body.data).to.include.all.keys(...Object.keys(productMock));
    });
    it("PATCH /api/products/update/:pid should return a status code of 200", async () => {
      const { statusCode, body } = await requester
        .patch(`/api/products/update/${idProduct}`)
        .set("Authorization", `${authToken}`)
        .send({ category: "otro" });

      expect(body.data.modifiedCount).to.equal(1);
      expect(statusCode).to.equal(200);
    });
    it("DELETE /api/products:id should return a status code of 200 and delete only one products", async () => {
      const { statusCode } = await requester
        .delete(`/api/products/${idProduct}`)
        .set("Authorization", `${authToken}`);

      expect(statusCode).to.equal(200);
    });
    it("DELETE /api/products should return a status code of 200 and delete all products", async () => {
      const { statusCode } = await requester
        .delete("/api/products")
        .set("Authorization", `${authToken}`);
      expect(statusCode).to.equal(200);
    });
  }),
    //TEST SESSION
    describe("Test Session", () => {
      it("GET /session/current should return a status code of 200 and object with data user", async () => {
        const { statusCode, body } = await requester
          .get(`/session/current`)
          .set("Authorization", `${authToken}`);
        expect(body.data).to.be.an("object");
        expect(statusCode).to.equal(200);
      });
    });
  //TEST CART
  describe("Test Carts", () => {
    before(async () => {
      // Crear un producto antes de las pruebas del carrito
      for (let i = 0; i < 4; i++) {
        await requester
          .post("/api/products")
          .set("Authorization", `${authToken}`)
          .send(productMock);
      }
      const { body } = await requester.get("/api/products");
      idProduct = body.data.payload[0].id;
    });
    it("Post /api/carts must return status code 201 and create a cart", async () => {
      for (let i = 0; i < 4; i++) {
        const { statusCode, created, body } = await requester
          .post("/api/carts")
          .set("Authorization", `${authToken}`);
        idCart = body.data._id;
        expect(statusCode).to.equal(201);
        expect(created).to.be.true;
      }
    });
    it("GET /api/carts/ should return a status code of 200 and a payload that is an array of objects ", async () => {
      const { statusCode, body } = await requester
        .get(`/api/carts`)
        .set("Authorization", `${authToken}`);

      expect(body.data).to.be.an("array");
      expect(statusCode).to.equal(200);
    });
    it("GET /api/carts/:cid should return a status code of 200 and cart found, this show only the products in a array ", async () => {
      const { statusCode, body } = await requester
        .get(`/api/carts/${idCart}`)
        .set("Authorization", `${authTokenUser}`);
      expect(body.data).to.be.an("array");
      expect(statusCode).to.equal(200);
    });
    it("GET /api/carts/summary/:cid should return a status code of 200 and cart found, this show a summary this cart", async () => {
      const { statusCode, body } = await requester
        .get(`/api/carts/summary/${idCart}`)
        .set("Authorization", `${authTokenUser}`);
      expect(body.data).to.be.an("array");
      expect(statusCode).to.equal(200);
    });

    it("Post /api/carts/:cid/product/:pid must return status code 201, this add products in the cart", async () => {
      for (let i = 0; i < 4; i++) {
        const { statusCode, created } = await requester
          .post(`/api/carts/${idCart}/product/${idProduct}`)
          .set("Authorization", `${authTokenUser}`);
        expect(statusCode).to.equal(201);
        expect(created).to.be.true;
      }
    });

    it("PUT /api/carts/:cid/product/:pid must return status code 200 and update quantity of one products in the cart", async () => {
      const { statusCode } = await requester
        .put(`/api/carts/${idCart}/product/${idProduct}`)
        .set("Authorization", `${authTokenUser}`)
        .send({ qty: 4 });
      expect(statusCode).to.equal(200);
    });
    it("GET /api/carts/:cid/purchase should return a status code of 200 and cart found, this show a summary this cart", async () => {
      const { statusCode, body } = await requester
        .get(`/api/carts/${idCart}/purchase`)
        .set("Authorization", `${authTokenUser}`);
      expect(body.data).to.be.an("object");
      expect(body.data).to.have.all.keys("ticket", "unpurchasedProducts");
      expect(statusCode).to.equal(200);
    });
    it("DELETE /api/carts/:cid/product/:pid must return status code 200 and delete products in the cart", async () => {
      const { statusCode } = await requester
        .delete(`/api/carts/${idCart}/product/${idProduct}`)
        .set("Authorization", `${authTokenUser}`);
      expect(statusCode).to.equal(200);
    });
    it("DELETE /api/carts/:cid must return status code 200 and clear the cart", async () => {
      const { statusCode } = await requester
        .delete(`/api/carts/${idCart}`)
        .set("Authorization", `${authTokenUser}`);
      expect(statusCode).to.equal(200);
    });
    it("DELETE /api/carts must return status code 200 and delete all the carts", async () => {
      const { statusCode } = await requester
        .delete("/api/carts")
        .set("Authorization", `${authToken}`);

      expect(statusCode).to.equal(200);
    });
    after(async () => {
      await requester
        .delete(`/api/products/${idProduct}`)
        .set("Authorization", `${authToken}`);
    });
  });
});
