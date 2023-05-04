import customRouter from "../custom/router.custom.js";
import handleResponse from "../middleware/handleResponse.js";
import {
  find,
  findById,
  create,
  deleteById,
  deleteCarts,
  addProdToCart,
  updateProducts,
  deleteProduct,
  deleteAllProducts,
  summaryCart,
  purchase,
} from "../service/carts.service.js";
import asyncWrapper from "../utils/asyncWrapper.js";

//REQ DE CARRITOS
class Carts extends customRouter {
  init() {
    this.get(
      "/",
      ["PUBLIC"],
      asyncWrapper(async (req, res, next) => {
        const response = await find();
        handleResponse(res, response, 200);
      })
    );

    this.get(
      "/:cid",
      ["USER", "SUPERIOR"],
      asyncWrapper(async (req, res, next) => {
        const { cid } = req.params;
        const response = await summaryCart(cid);
        handleResponse(res, response, 200);
      })
    );

    this.post(
      "/",
      ["PUBLIC"],
      asyncWrapper(async (req, res, next) => {
        const response = await create();
        handleResponse(res, response, 201);
      })
    );
    //borra todos los carritos
    this.delete(
      "/",
      ["ADMIN", "SUPERIOR"],
      asyncWrapper(async (req, res, next) => {
        const response = await deleteCarts();
        handleResponse(res, response, 204);
      })
    );
    //borra un carrito en especifico
    // this.delete("/:cid", async (req, res) => {
    //   try {
    //     const { cid } = req.params;
    //     const response = await carts.deleteById(cid);
    //     res.json({ result: "succes", payload: response });
    //   } catch (error) {
    //     res.json({ error: error.message });
    //   }
    // });

    //REQUEST DE PRODUCTOS DEL CARRITO
    //agrega productos al carrito
    this.post(
      "/:cid/product/:pid",
      ["USER", "EXCLUSIVE"],
      asyncWrapper(async (req, res, next) => {
        const { cid, pid } = req.params;
        // const prodId = pid || data;
        const response = await addProdToCart(cid, pid);
        handleResponse(res, response, 201);
      })
    );
    //actualiza la cantidad de un producto que se encuentre en el carrito
    this.put(
      "/:cid/product/:pid",
      ["USER", "EXCLUSIVE"],
      asyncWrapper(async (req, res, next) => {
        const { cid, pid } = req.params;
        const { qty } = req.body;
        const response = await updateProducts(cid, pid, qty);
        handleResponse(res, response, 200);
      })
    );
    //elimina un producto seleccionado de uno en uno
    this.delete(
      "/:cid/product/:pid",
      ["USER", "EXCLUSIVE"],
      asyncWrapper(async (req, res, next) => {
        const { cid, pid } = req.params;

        const response = await deleteProduct(cid, pid);
        handleResponse(res, response, 204);
        res.json({ result: "succes", payload: response });
      })
    );
    //elimina todos los productos de un carrito seleccionado
    this.delete(
      "/:cid",
      ["USER", "EXCLUSIVE"],
      asyncWrapper(async (req, res, next) => {
        const { cid } = req.params;
        const response = await deleteAllProducts(cid);
        handleResponse(res, response, 204);
      })
    );

    // PURCHASE
    this.get(
      "/:cid/purchase",
      ["USER", "SUPERIOR"],
      asyncWrapper(async (req, res, next) => {
        //validar stock de productos
        const { cid } = req.params;
        const email = req.user.email;
        const response = await purchase(cid, email);
        res.json({ result: "succes", payload: response });
      })
    );
  }
}

export default Carts;
