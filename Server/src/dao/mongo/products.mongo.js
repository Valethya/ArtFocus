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
      throw error;
    }
  }
  //busca un producto por id
  async persistFindById(pid) {
    try {
      const response = await productsModel.findOne({ _id: pid });

      return response;
    } catch (error) {
      throw error;
    }
  }
  //crea un producto
  async persistCreate(prod) {
    try {
      await productsModel.create(prod);
    } catch (error) {
      throw error;
    }
  }
  //crea muchos productos
  async persistPopulate(product) {
    try {
      await productsModel.insertMany(product);
    } catch (error) {
      throw error;
    }
  }

  //borra todos los productos
  async persistDelete() {
    try {
      const deletedProducts = await productsModel.deleteMany();
      return deletedProducts;
    } catch (error) {
      throw error;
    }
  }
  // borra un producto por id
  async persistDeleteById(pid) {
    try {
      const productDeleted = await productsModel.deleteOne({ _id: pid });
      return productDeleted;
    } catch (error) {
      throw error;
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
    } catch (error) {
      throw error;
    }
  }
  async persistVerifyOwner(email, id) {
    try {
      const result = await productsModel.findById(id);
      if (result && result.owner === email) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw error;
    }
  }
  async;
}
export default productsManager;
