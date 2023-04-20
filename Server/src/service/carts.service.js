import managerFactory from "../factories/manager.factories.js";
import { findById as findByIdProd } from "./products.service.js";
import mongoose from "mongoose";
import { createTicket } from "./ticket.service.js";

const manager = await managerFactory.getManager("carts");
const managerProd = await managerFactory.getManager("products");

///

async function find() {
  try {
    const foundCarts = await manager.persistFind();
    return {
      status: 200,
      message: foundCarts,
    };
  } catch (error) {
    throw new Error(error.message);
  }
}

async function findById(cid) {
  try {
    const response = await manager.persistFindById({ _id: cid });

    if (response == null) {
      throw new Error({
        status: 404,
        message: `El carrito con id ${cid} no existe`,
      });
    }
    return {
      status: 200,
      message: response.products,
    };
  } catch (error) {
    throw new Error(error.message);
  }
}

async function create() {
  try {
    const cart = await manager.persistCreate();
    return cart;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function deleteCarts() {
  try {
    const deletedCarts = await manager.persistDelete();
    if (deletedCarts.deletedCount == 0) {
      throw new Error({
        status: 404,
        message: "no hay productos para borrar",
      });
    }
    return {
      status: 204,
      message: "carritos eliminados",
    };
  } catch (error) {
    throw new Error(error.message);
  }
}

async function deleteById(cid) {
  try {
    const cartDeleted = await manager.persistDeleteById({ _id: cid });
    if (cartDeleted.deletedCount == 0) {
      throw new Error({
        status: 404,
        message: `El carrito con id ${cid} no existe`,
      });
    }
    return {
      status: 204,
      message: `carrito ${cid} eliminado`,
    };
  } catch (error) {
    throw new Error(error.message);
  }
}

async function CheckDocument(cid, pid) {
  const cart = await findById(cid);
  const prod = await findByIdProd(pid);

  if (!cart && !prod) {
    throw new Error({
      status: 404,
      message: `El carrito con id ${cid} y el producto con id ${pid} no existen`,
    });
  }
  if (!cart) {
    throw new Error({
      status: 404,
      message: `El carrito con id ${cid} no existe`,
    });
  }
  if (!prod) {
    throw new Error({
      status: 404,
      message: `El producto con id ${pid} no existe`,
    });
  }

  return true;
}

async function addProdToCart(cid, pid) {
  try {
    await CheckDocument(cid, pid);

    const add = await manager.persistAddProdToCart(cid, pid);
    return add;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function updateProducts(cid, pid, qty) {
  try {
    await CheckDocument(cid, pid);
    const result = await manager(cid, pid, qty);
    return result;
  } catch (error) {
    return error.message;
  }
}
async function deleteProduct(cid, pid) {
  try {
    await CheckDocument(cid, pid);
    const result = manager.persistDeleteProduct(cid, pid);
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function deleteAllProducts(cid) {
  try {
    const cart = await manager.persistFindById(cid);
    if (cart == null) {
      throw new Error({
        status: 404,
        message: `El carrito con id ${cid} no existe`,
      });
    }
    await manager.persistDeleteAllProducts(cid);

    return {
      status: 204,
      message: `todos los productos fueron eliminados del carrito`,
    };
  } catch (error) {
    throw error;
  }
}
async function summaryCart(cid) {
  try {
    const summary = manager.summaryCart(cid);
    return summary;
  } catch (error) {
    throw error;
  }
}

async function purchase(cid, email) {
  try {
    const response = await summaryCart(cid);
    const unpurchasedProducts = [];
    const dataPurchase = { amount: 0, email: email };
    const productInCart = response[0].summaryByProducts;

    const promise = productInCart.map(async (prodCart) => {
      const qtyProdCart = prodCart.totalQuantity;
      const prodId = prodCart.productId;

      const productStore = await managerProd.persistFindById(prodId);

      const stockProdStore = productStore.stock;

      if (qtyProdCart <= stockProdStore) {
        dataPurchase.amount += prodCart.totalValue;

        await managerProd.persistDecreaseStock(prodId, qtyProdCart);

        await manager.persistUpdateProducts(cid, prodId, 1);
        await manager.persistDeleteProduct(cid, prodId);

        return {
          _id: productStore._id,
          title: productStore.title,
          price: productStore.price,
        };
      } else {
        unpurchasedProducts.push(prodCart);
        return null;
      }
    });

    await Promise.all(promise);
    const ticket = createTicket(dataPurchase);
    return { payload: { ticket, unpurchasedProducts } };
  } catch (error) {
    throw error;
  }
}
export {
  find,
  findById,
  create,
  deleteCarts,
  deleteById,
  addProdToCart,
  updateProducts,
  deleteProduct,
  deleteAllProducts,
  summaryCart,
  purchase,
};

// import cartsManager from "../dao/mongo/carts.mongo.js";

// const manager = new cartsManager();
