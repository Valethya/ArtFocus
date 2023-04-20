import fs from "fs";

export default class CartsManager {
  constructor() {
    this.path = "src/file/carts.json";
  }
  static #instance;
  static getInstance() {
    return this.#instance ? this.#instance : new CartsManager();
  }
  ///METHODS

  getCarts = async () => {
    debugger;
    if (fs.existsSync(this.path)) {
      const data = await fs.promises.readFile(this.path, "utf-8");
      const carts = JSON.parse(data);
      return carts;
    } else {
      return [];
    }
  };

  addCart = async (products) => {
    const carts = await this.getCarts();

    let lastId = carts.length != 0 ? carts[carts.length - 1].id : 0;
    products.id = ++lastId;

    carts.push(products);
    await fs.promises.writeFile(this.path, JSON.stringify(carts));
    return products;
  };

  getCartById = async (cid) => {
    let carts = await this.getCarts();
    let cart = carts.find((item) => item.id == Number(cid));
    return cart ? cart : (cart = { error: "el producto no existe" });
  };

  addProductToCart = async (cid, product) => {
    const carts = await this.getCarts();

    const { id } = product;
    let idProd = { id };
    debugger;
    const indexProd = carts.findIndex((item) => item.id == cid);

    const products = carts[indexProd].products;

    let inCart = products.find((item) => item.product == idProd.id);

    inCart
      ? inCart.quantity++
      : products.push({ product: idProd.id, quantity: 1 });

    await fs.promises.writeFile(this.path, JSON.stringify(carts));
    return products;
  };

  updateProduct = async (idProd, infoProduct) => {
    let carts = await this.getProducts();
    let product = carts.findIndex((item) => item.id == idProd);
    let id = carts[product].id;
    carts[product] = { ...infoProduct, id };

    await fs.promises.writeFile(this.path, JSON.stringify(carts));
  };

  deleteProduct = async (id) => {
    const carts = await this.getProducts();

    let products = carts.filter((item) => item.id != id);

    await fs.promises.writeFile(this.path, JSON.stringify(products));
  };
}
