import customRouter from "../custom/router.custom.js";
import {
  populate,
  findById,
  find,
  findProducts,
  create,
  deleteById,
  deleteProduct,
  update,
} from "../service/products.service.js";
import io from "../app.js";

class Products extends customRouter {
  init() {
    this.get("/", ["PUBLIC"], async (req, res) => {
      try {
        const response = await find(req);
        res.json(response);
      } catch (error) {
        res.json({ error: error.message });
      }
    });

    this.get("/:pid", ["PUBLIC"], async (req, res) => {
      try {
        const { pid } = req.params;
        const response = await findById(pid);
        res.json({ result: "succes", payload: response });
      } catch (error) {
        res.json({ error: error, message });
      }
    });

    // this.post("/",["ADMIN","SUPERIOR"], async (req, res) => {
    //   try {
    //     const { title, description, price, thumbnail, stock, category } = req.body;

    //     const product = {
    //       title,
    //       description,
    //       price,
    //       thumbnail,
    //       stock,
    //       status: true,
    //       category,
    //     };
    //     const response = await create(product);

    //     const allProducts = await find(req);
    //     io.emit("newProducts", allProducts);
    //     res.status(201).json({ result: "succes", payload: response });
    //   } catch (error) {
    //     res.json({ message: error.message });
    //   }
    // });

    /*---POPULATE---*/
    this.post("/", ["ADMIN", "SUPERIOR"], async (req, res) => {
      try {
        const foundProducts = await findProducts();
        await populate(foundProducts);
        res.json({ message: "productos cargados" });
      } catch (error) {
        res.json({ error: error.message });
      }
    });
    // //
    this.delete("/", ["ADMIN", "SUPERIOR"], async (req, res) => {
      try {
        const response = await deleteProduct();
        res.json({ result: "succes", payload: response });
      } catch (error) {
        res.json({ error: error.message });
      }
    });

    this.delete("/:pid", ["ADMIN", "SUPERIOR"], async (req, res) => {
      try {
        const { pid } = req.params;
        const response = await deleteById(pid);

        const allProducts = await find(req);

        io.emit("newProducts", allProducts);

        res.json({ result: "succes", payload: response });
      } catch (error) {
        res.json({ error: error.message });
      }
    });

    this.patch("/update/:pid", ["ADMIN", "SUPERIOR"], async (req, res) => {
      try {
        const { pid } = req.params;
        const updateOps = {};

        for (const [key, value] of Object.entries(req.body)) {
          updateOps[key] = value;
        }

        const response = await update(pid, updateOps);

        res.json({ result: "succes", payload: response });
      } catch (error) {
        res.json({ error: error.message });
      }
    });
  }
}

export default Products;
