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
  verifyOwner,
} from "../service/products.service.js";
import io from "../app.js";
import handleResponse from "../middleware/handleResponse.js";
import asyncWrapper from "../utils/asyncWrapper.js";
import { verifyToken } from "../utils/jwt.utils.js";
import CustomError from "../utils/errors/custom.error.js";
import { tokenExtractor } from "../utils/tokenExtractor.js";
import __dirname, { uploader } from "../utils/util.js";
import path from "path";

class Products extends customRouter {
  init() {
    this.get(
      "/",
      ["PUBLIC"],
      asyncWrapper(async (req, res) => {
        const response = await find(req);
        handleResponse(res, response, 200);
      })
    );

    this.get(
      "/:pid",
      ["PUBLIC"],
      asyncWrapper(async (req, res, next) => {
        const { pid } = req.params;
        const response = await findById(pid);
        handleResponse(res, response, 200);
      })
    );

    this.post(
      "/",
      ["ADMIN", "PREMIUM"],
      uploader("img/products").single("image"),
      asyncWrapper(async (req, res, next) => {
        const response = await create(req);
        const allProducts = await find(req);
        io.emit("newProducts", allProducts);
        handleResponse(res, response, 201);
      })
    );

    /*---POPULATE---*/
    this.post(
      "/populate",
      ["PUBLIC"],
      asyncWrapper(async (req, res, next) => {
        const foundProducts = await findProducts();
        const response = await populate(foundProducts);
        handleResponse(res, response, 201);
      })
    );
    // //
    this.delete(
      "/",
      ["PUBLIC", "ADMIN"],
      asyncWrapper(async (req, res, next) => {
        const response = await deleteProduct();
        handleResponse(res, response, 200);
      })
    );

    this.delete(
      "/:pid",
      ["ADMIN", "PREMIUM"],
      asyncWrapper(async (req, res, next) => {
        const { pid } = req.params;
        const token = tokenExtractor(req);
        const decoded = verifyToken(token);
        const email = decoded.email;
        const role = decoded.role;

        if (role !== "admin") {
          const isOwner = await verifyOwner(email, pid);
          if (!isOwner) {
            CustomError.createError({
              cause: "Usuario no es propietario del producto",
              message: "Para borrar este producto debes ser el creador",
              statusCode: 404,
              code: 1009,
            });
          }
        } else {
          const isOwner = await verifyOwner(email, pid);
          if (!isOwner) {
            await transport.sendMail({
              from: "mailingartfocus@gmail.com",
              to: email,
              subject: "Unos de tus productos ha sido eliminados",
              html: `El producto con id ${pid} ha sido eliminado`,
              attachments: [],
            });
          }
        }

        const response = await deleteById(pid);

        // const allProducts = await find(req);

        // io.emit("newProducts", allProducts);

        handleResponse(res, response, 200);
      })
    );

    this.patch(
      "/update/:pid",
      ["ADMIN", "PREMIUM"],
      asyncWrapper(async (req, res, next) => {
        const { pid } = req.params;
        const ops = optionsUpDate(req.body);
        const response = await update(pid, ops);

        handleResponse(res, response, 200);
      })
    );
  }
}

export default Products;
