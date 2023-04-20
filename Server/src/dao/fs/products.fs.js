import fs from "fs";

export default class ProductsManager {
  // Clase para administrar productos

  ///CONSTRUCTOR
  constructor() {
    this.path = "product.json";
  }
  static #instance;
  static getInstance() {
    return this.#instance ? this.#instance : new ProductsManager();
  }
  ///METHODS

  getProducts = async () => {
    debugger;
    if (fs.existsSync(this.path)) {
      const data = await fs.promises.readFile(this.path, "utf-8");
      const productos = JSON.parse(data);
      return productos;
    } else {
      return [];
    }
  };

  addProduct = async (newProducts) => {
    const products = await this.getProducts();

    let lastId = products.length != 0 ? products[products.length - 1].id : 1;
    newProducts.id = ++lastId;

    products.push(newProducts);
    await fs.promises.writeFile(this.path, JSON.stringify(products));
    return await getProducts();
  };

  getProductsById = async (id) => {
    let products = await this.getProducts();
    let product = products.find((item) => item.id == id);
    return product ? product : (product = { error: "el producto no existe" });
  };

  updateProduct = async (idProd, infoProduct) => {
    let products = await this.getProducts();
    let product = products.findIndex((item) => item.id === Number(idProd));

    let id = products[product].id;
    products[product] = { ...infoProduct, id };

    await fs.promises.writeFile(this.path, JSON.stringify(products));
  };

  deleteProduct = async (id) => {
    const products = await this.getProducts();

    let newProducts = products.filter((item) => item.id != id);

    await fs.promises.writeFile(this.path, JSON.stringify(newProducts));
    return await this.getProducts();
  };
}
