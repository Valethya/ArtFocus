import cartsModel from "./models/carts.models.js";
import mongoose from "mongoose";

export default class cartsManager {
  static #instance;

  static getInstance() {
    return this.#instance ? this.#instance : new cartsManager();
  }

  //muestra todos los carritos
  async persistFind() {
    try {
      const products = await cartsModel.find();

      return products;
    } catch (error) {
      throw error;
    }
  }
  // summary cart
  async persistSummaryCart(cid) {
    try {
      await this.persistFindById(cid);

      const summary = await cartsModel.aggregate([
        { $match: { _id: new mongoose.Types.ObjectId(cid) } },
        { $unwind: "$products" },
        {
          $lookup: {
            from: "products",
            localField: "products.product",
            foreignField: "_id",
            as: "product",
          },
        },
        { $unwind: "$product" },
        {
          $group: {
            _id: "$_id",
            summaryByProducts: {
              $push: {
                productId: "$product._id",
                value: "$product.price",
                totalValue: {
                  $multiply: ["$products.qty", "$product.price"],
                },
                totalQuantity: "$products.qty",
              },
            },
            totalValue: {
              $sum: {
                $let: {
                  vars: {
                    totalPrice: {
                      $multiply: ["$products.qty", "$product.price"],
                    },
                  },
                  in: "$$totalPrice",
                },
              },
            },
            totalQuantity: {
              $sum: "$products.qty",
            },
          },
        },
      ]);
      console.log(summary, "esto es summary");
      return summary;
    } catch (error) {
      throw error;
    }
  }
  //encuentra un carrito por su id
  async persistFindById(cid) {
    try {
      const cart = await cartsModel.findOne({ _id: cid });
      console.log(cart, "esto es cart");
      if (!cart) {
        const error = new Error(`El carrito con id ${cid} no existe`);
        error.code = 404;
        throw error;
      }
      return cart;
    } catch (error) {
      throw error;
    }
  }
  // crea un carrito
  async persistCreate() {
    try {
      const cart = await cartsModel.create({ products: [] });
      return cart;
    } catch (error) {
      throw error;
    }
  }

  //elimina todos los carritos
  async persistDelete() {
    try {
      await cartsModel.deleteMany();
      return "succes";
    } catch (error) {
      throw error;
    }
  }
  //elimina un carrito
  async persistDeleteById(cid) {
    try {
      const cart = await cartsModel.deleteOne({ _id: cid });
      if (!cart) {
        if (!cart) {
          const error = new Error(`El carrito con id ${cid} no existe`);
          error.code = 404;
          throw error;
        }
      }
      return cart;
    } catch (error) {
      throw error;
    }
  }

  // METODOS PARA LOS PRODUCTOS DEL CARRITO

  //metodo para verificar existencia de los documentos en la collecion

  //agrega productos al carrito
  async persistAddProdToCart(cid, pid) {
    try {
      /*si hay un documento con id:cid que contenga una propiedad products 
      que no contenga un campo product igual a pid*/
      const result = await cartsModel.updateOne(
        { _id: cid, "products.product": { $ne: pid } },
        { $addToSet: { products: { product: pid, qty: 1 } } }
      );
      if (result.modifiedCount === 0) {
        /*como no se a modificado ningun archivo quiere decir que no se ha 
      agregado un producto nuevo por lo tanto solo se realiza la suma de la cantidad*/
        await cartsModel.updateOne(
          { _id: cid, "products.product": pid },
          { $inc: { "products.$.qty": 1 } }
        );
      }

      return `el producto ${pid} fue agregado a tu carrito`;
    } catch (error) {
      throw error;
    }
  }
  //se actualiza la cantidad de un producto especifico
  async persistUpdateProducts(cid, pid, qty) {
    try {
      await cartsModel.findOneAndUpdate(
        { _id: cid, "products.product": pid },
        { $set: { "products.$.qty": qty } },
        { new: true }
      );
      return `la cantidad de productos se ha actualizado en: ${qty}`;
    } catch (error) {
      throw error;
    }
  }
  // elimina un productos del carrito
  async persistDeleteProduct(cid, pid) {
    try {
      /*se busca un carrito por su id y de que este tenga una propiedad products 
      que contenga un campo product igual a pid, si este existe decrementa en 1*/
      const prodMenos = await cartsModel.updateOne(
        { _id: cid, "products.product": pid },
        { $inc: { "products.$.qty": -1 } },
        { new: true }
      );

      /*si el carrito tiene una propiedad products con un campo qty igual a 0 
      este producto se elimina del carrito*/

      const prodFuera = await cartsModel.updateOne(
        { _id: cid, "products.product": pid },
        { $pull: { products: { qty: 0 } } },
        { new: true }
      );
      console.log(prodFuera, " se supone que deberia eliminarse");
      return `el producto ${pid} fue eliminado de tu carrito`;
    } catch (error) {
      throw error;
    }
  }
  //elimina todos los productos del carrito
  async persistDeleteAllProducts(cid) {
    try {
      const response = await cartsModel.updateOne(
        { _id: cid },
        { $set: { products: [] } }
      );

      return response;
    } catch (error) {
      throw error;
    }
  }
  /*--PURCHASE--*/

  async persistPurchase() {
    try {
      const foundProduct = await this.persistFind();
      return foundProduct;
    } catch (error) {
      throw error;
    }
  }
}
