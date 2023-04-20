import productsModel from "./models/products.models.js";

class productsManager {
  static #instance;

  static getInstance() {
    return this.#instance ? this.#instance : new productsManager();
  }

  //METODOS PARA PRODUCTOS
  //busca todos los productos
  async persistFind(query, options) {
    try {
      const foundProducts = await productsModel.paginate(query, options);

      return foundProducts;
    } catch (error) {
      return error.message;
    }
  }
  //busca un producto por id
  async persistFindById(pid) {
    try {
      const response = await productsModel.findOne({ _id: pid });

      return response;
    } catch (error) {
      return error.message;
    }
  }
  //crea un producto
  async persistCreate(prod) {
    await productsModel.create(prod);
  }
  //crea muchos productos
  async persistPopulate(product) {
    await productsModel.insertMany(product);
  }

  //borra todos los productos
  async persistDelete() {
    try {
      const deletedProducts = await productsModel.deleteMany();
      return deletedProducts;
    } catch (error) {
      return error.message;
    }
  }
  // borra un producto por id
  async persistDeleteById(pid) {
    try {
      const productDeleted = await productsModel.deleteOne({ _id: pid });
      return productDeleted;
    } catch (error) {
      return error.message;
    }
  }
  // descontar stock
  async persistDecreaseStock(pid, qty) {
    try {
      const result = await productsModel.findByIdAndUpdate(
        { _id: pid },
        { $inc: { stock: -qty } },
        { new: true }
      );
      if (!result) {
        throw { message: "Producto no encontrado" };
      }

      return "todo ok";
    } catch (error) {
      throw { message: "Error al actualizar el producto", error };
    }
  }

  async persistUpdate(id, ops) {
    try {
      const result = await productsModel.updateOne({ _id: id }, { $set: ops });

      return result;
    } catch (error) {}
  }
}
export default productsManager;
