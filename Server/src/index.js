import express from "express";
import passport from "passport";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { mongoConect } from "./db/index.db.js";
import cors from "cors";
import router from "./router/index.router.js";
import initializePassport from "./config/passport.config.js";
import session from "express-session";
import mongoStore from "connect-mongo";
import { passSession } from "./config/index.config.js";
import { mongoUri } from "./db/index.db.js";
console.log("inciando index.js");
export const app = express();

/*--EXPRESS--*/
app.use(
  session({
    store: mongoStore.create({
      mongoUrl: mongoUri,
      mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
      ttl: 120,
    }),
    secret: passSession,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/*--CORS--*/

app.use(cors({ origin: "http://127.0.0.1:5173" }));

/*--PASSPORT--*/

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

/*--COOKIES--*/

app.use(cookieParser());

app.use(morgan("dev"));

router(app);
/*--mONGOOSE--*/

// mongoConect();

/*----async function purchase(cid) {
  try {
    const summary = await summaryCart(cid);
    const productsStore = await managerProd.persistFind();
    const productInCart = summary[0].summaryByProducts;
    console.log(productInCart, "estos son los productos en el carrito");

    const insufficientStock = [];

    const promise = productInCart.map(async ({ productId, totalQuantity }) => {
      const productObjId = new mongoose.Types.ObjectId(productId);
      const qtyProdCart = totalQuantity;

      const products = productsStore.docs.find(async (prodStore) =>
        prodStore._id.equals(productObjId)
      );

      const stockProdStore = products.stock;

      if (qtyProdCart > stockProdStore) {
        console.log("insuficiente stock");
        insufficientStock.push(products);
        throw new Error(
          `No hay suficiente stock para el producto con id ${productObjId}`
        );
      } else {
        await Promise.all([
          managerProd.persistDecreaseStock(productObjId, qtyProdCart),
          manager.persistUpdateProducts(cid, productObjId, 1),
          manager.persistDeleteProduct(cid, productObjId),
        ]);

        return products;
      }
    });
    console.log(insufficientStock, " productos con insuficiente stock");

    const result = Promise.all(promise);
    return result;
  } catch (error) {
    throw error;
  }----*/

///primero y original que no funciona
/*---async function purchase(cid) {
  try {
    const response = await summaryCart(cid);

    const productsStore = await managerProd.persistFind();
    const productInCart = response[0].summaryByProducts;

    const insufficientStock = [];

    const promise = productInCart.map(async (prodCart) => {
      const productObjId = new mongoose.Types.ObjectId(prodCart.productId);
      const qtyProdCart = prodCart.totalQuantity;

      const products = await productsStore.docs.find(async (prodStore) => {
        const bool = prodStore._id.toString() == productObjId.toString();
        const stockProdStore = prodStore.stock;

        if (bool) {
          if (qtyProdCart <= stockProdStore) {
            const result = await managerProd.persistDecreaseStock(
              productObjId,
              qtyProdCart
            );

            await manager.persistUpdateProducts(cid, productObjId, 1);
            await manager.persistDeleteProduct(cid, productObjId);
            return result;
          } else {
            insufficientStock.push(prodCart);
          }
        }
      });

      return products;
    });
    console.log(insufficientStock, " prod sin suff stock");
    const result = Promise.all(promise);
    return result;
  } catch (error) {
    throw error;
  }
}--*/

//FUNCIONA BIEN ASI
/*
import persistFactory from "./persist.factories.js";
const AuthManager = await persistFactory.getPersist("auth");
const CartsManager = await persistFactory.getPersist("carts");
const ProductsManager = await persistFactory.getPersist("products");
const UsersManager = await persistFactory.getPersist("users");
const MessageManager = await persistFactory.getPersist("message");
const TicketsManager = await persistFactory.getPersist("tickets");



export default class managerFactory {
  static async getManager(manager) {
    const managers = {
      products: await ProductsManager.default.getInstance(),
      carts: CartsManager.default.getInstance(),
      users: UsersManager.default.getInstance(),
      auth: AuthManager.default.getInstance(),
      message: MessageManager.default.getInstance(),
      ticket: TicketsManager.default.getInstance(),
    };
    return managers[manager];
  }
}


import { mongoConect } from "../db/index.db.js";
import { persist } from "../config/index.config.js";

class persistFactory {
  static async getPersist(collection) {
    const persists = {
      MONGO: async () => {
        mongoConect();
        console.log("persistencia en mongo");
        console.log(`../dao/mongo/${collection}.mongo.js`);
        return await import(`../dao/mongo/${collection}.mongo.js`);
      },
      FS: async () => {
        console.log("persistnecia en fs");
        await import(`../dao/fs/${collection}.fs.js`);
      },
    };
    console.log(await persists[persist], " vamos funciona");
    return persists[persist]();
  }
}

export default persistFactory;
*/
