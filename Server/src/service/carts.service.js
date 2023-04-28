import managerFactory from "../factories/manager.factories.js";
import { findById as findByIdProd } from "./products.service.js";
import mongoose from "mongoose";
import { createTicket } from "./ticket.service.js";
import causeError from "../utils/errors/cause.error.js";
import messagesError from "../utils/errors/message.error.js";
import { EnumError } from "../utils/errors/enums.errors.js";

const manager = await managerFactory.getManager("carts");
const managerProd = await managerFactory.getManager("products");

///

async function find() {
  try {
    const foundCarts = await manager.persistFind();
    return foundCarts;
  } catch (error) {
    throw error;
  }
}

async function findById(cid) {
  try {
    const response = await manager.persistFindById({ _id: cid });

    // if (response == null) {
    //   CustomError.createError({
    //     cause: causeError.ID_NOT_FOUND,
    //     message: messagesError.CART_NOT_FOUND,
    //     statusCode: 404,
    //     code: EnumError.CART_NOT_FOUND,
    //   });
    // }
    return response.products;
  } catch (error) {
    throw error;
  }
}

async function create() {
  try {
    const cart = await manager.persistCreate();
    return cart;
  } catch (error) {
    throw error;
  }
}

async function deleteCarts() {
  try {
    const deletedCarts = await manager.persistDelete();
    if (deletedCarts.deletedCount == 0) {
      const error = new Error("no hay productos para borrar");
      error.code = 404;
      throw error;
    }
    return "carritos eliminados";
  } catch (error) {
    throw error;
  }
}

async function deleteById(cid) {
  try {
    const cartDeleted = await manager.persistDeleteById({ _id: cid });
    if (cartDeleted.deletedCount == 0) {
      CustomError.createError({
        cause: causeError.ID_NOT_FOUND,
        message: messagesError.CART_NOT_FOUND,
        statusCode: 404,
        code: EnumError.CART_NOT_FOUND,
      });
    }
    return `carrito ${cid} eliminado`;
  } catch (error) {
    throw error;
  }
}

async function CheckDocument(cid, pid) {
  console.log(cid, pid, " estos son ids");
  if (cid === ":cid" || pid === ":pid") {
    const error = new Error(
      `no se han proporcionado un carrito y / o producto`
    );
    error.code = 404;
    throw error;
  }
  const cart = await findById(cid);
  const prod = await findByIdProd(pid);
  if (!cart && !prod) {
    const error = new Error(
      `El carrito con id ${cid} y el producto con id ${pid} no existen`
    );
    error.code = 404;
    throw error;
  }
  if (!cart) {
    const error = new Error(`El carrito con id ${cid} no existe`);
    error.code = 404;
    throw error;
  }
  if (!prod) {
    const error = new Error(`El producto con id ${pid} no existe`);
    error.code = 404;
    throw error;
  }

  return true;
}

async function addProdToCart(cid, pid) {
  try {
    await CheckDocument(cid, pid);

    const add = await manager.persistAddProdToCart(cid, pid);
    return add;
  } catch (error) {
    throw error;
  }
}

async function updateProducts(cid, pid, qty) {
  try {
    await CheckDocument(cid, pid);
    const result = await manager.persistUpdateProducts(cid, pid, qty);
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
    throw error;
  }
}

async function deleteAllProducts(cid) {
  try {
    const cart = await manager.persistFindById(cid);
    if (cart == null) {
      const error = new Error(`El carrito con id ${cid} no existe`);
      error.code = 404;
      throw error;
    }
    await manager.persistDeleteAllProducts(cid);

    return;
  } catch (error) {
    throw error;
  }
}
async function summaryCart(cid) {
  try {
    const summary = await manager.persistSummaryCart(cid);
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
    const ticket = await createTicket(dataPurchase);
    return { ticket, unpurchasedProducts };
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
