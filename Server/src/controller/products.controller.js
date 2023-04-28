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
import handleResponse from "../middleware/handleResponse.js";

class Products extends customRouter {
  init() {
    this.get("/", ["PUBLIC"], async (req, res, next) => {
      try {
        const response = await find(req);
        handleResponse(res, response, 200);
      } catch (error) {
        next(error);
      }
    });

    this.get("/:pid", ["PUBLIC"], async (req, res, next) => {
      try {
        const { pid } = req.params;
        const response = await findById(pid);
        handleResponse(res, response, 200);
      } catch (error) {
        next(error);
      }
    });

    // this.post("/",["ADMIN","SUPERIOR"], async (req, res,next) => {
    //   try {
    //     const { title, description, price, thumbnail, stock, category } = req.body;

    //     const product = {
    //       title,
    //       description,
    //       price,
    //       thumbnail,
    //       stock,
    //       code: true,
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
    this.post("/", ["ADMIN", "SUPERIOR"], async (req, res, next) => {
      try {
        const foundProducts = await findProducts();
        const response = await populate(foundProducts);
        handleResponse(res, response, 200);
      } catch (error) {
        next(error);
      }
    });
    // //
    this.delete("/", ["ADMIN", "SUPERIOR"], async (req, res, next) => {
      try {
        const response = await deleteProduct();
        handleResponse(res, response, 204);
      } catch (error) {
        next(error);
      }
    });

    this.delete("/:pid", ["ADMIN", "SUPERIOR"], async (req, res, next) => {
      try {
        const { pid } = req.params;
        const response = await deleteById(pid);

        const allProducts = await find(req);

        io.emit("newProducts", allProducts);

        handleResponse(res, response, 204);
      } catch (error) {
        next(error);
      }
    });

    this.patch(
      "/update/:pid",
      ["ADMIN", "SUPERIOR"],
      async (req, res, next) => {
        try {
          const { pid } = req.params;
          const updateOps = {};

          for (const [key, value] of Object.entries(req.body)) {
            updateOps[key] = value;
          }

          const response = await update(pid, updateOps);

          handleResponse(res, response, 200);
        } catch (error) {
          next(error);
        }
      }
    );
  }
}

export default Products;
