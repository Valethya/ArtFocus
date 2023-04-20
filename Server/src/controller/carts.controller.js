import customRouter from "../custom/router.custom.js";
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

//REQ DE CARRITOS
class Carts extends customRouter {
  init() {
    this.get("/", ["USER", "EXCLUSIVE"], async (req, res) => {
      try {
        const response = await find();
        res.json({ result: "succes", payload: response });
      } catch (error) {
        res.json({ error: error.message });
      }
    });

    this.get("/:cid", ["USER", "SUPERIOR"], async (req, res) => {
      try {
        const { cid } = req.params;
        const response = await summaryCart(cid);
        res.json({ result: "succes", payload: response });
      } catch (error) {
        res.json({ error: error.message });
      }
    });

    this.post("/", ["PUBLIC"], async (req, res) => {
      try {
        const response = await create();

        res.json({ result: "succes", payload: response });
      } catch (error) {
        res.json({ error: error.message });
      }
    });
    //borra todos los carritos
    this.delete("/", ["ADMIN", "SUPERIOR"], async (req, res) => {
      try {
        const response = await deleteCarts();
        res.json({ result: "succes", payload: response });
      } catch (error) {
        res.json({ error: error.message });
      }
    });
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
    this.post("/:cid/product/:pid", ["USER", "EXCLUSIVE"], async (req, res) => {
      try {
        const { cid, pid } = req.params;
        // const prodId = pid || data;
        const response = await addProdToCart(cid, pid);

        res.json({ result: "succes", payload: response });
      } catch (error) {
        res.json({ error: error.message });
      }
    });
    //actualiza la cantidad de un producto que se encuentre en el carrito
    this.put("/:cid/product/:pid", ["USER", "EXCLUSIVE"], async (req, res) => {
      try {
        const { cid, pid } = req.params;
        const { qty } = req.body;
        const response = await updateProducts(cid, pid, qty);
        res.json({ response: response });
      } catch (error) {
        res.json({ error: error.message });
      }
    });
    //elimina un producto seleccionado de uno en uno
    this.delete(
      "/:cid/product/:pid",
      ["USER", "EXCLUSIVE"],
      async (req, res) => {
        try {
          const { cid, pid } = req.params;

          const response = await deleteProduct(cid, pid);

          res.json({ result: "succes", payload: response });
        } catch (error) {
          res.json({ error: error.message });
        }
      }
    );
    //elimina todos los productos de un carrito seleccionado
    this.delete("/:cid", ["USER", "EXCLUSIVE"], async (req, res) => {
      try {
        const { cid } = req.params;
        const response = await deleteAllProducts(cid);
        res.json({ result: succes, payload: response });
      } catch (error) {
        res.json({ error: error.message });
      }
    });

    // PURCHASE
    this.get("/:cid/purchase", ["USER", "SUPERIOR"], async (req, res) => {
      try {
        //validar stock de productos
        const { cid } = req.params;
        const email = req.user.email;
        const response = await purchase(cid, email);
        res.json({ result: "succes", payload: response });
      } catch (error) {
        res.json({ error: error.message });
      }
    });
  }
}

export default Carts;
