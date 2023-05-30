import managerFactory from "../factories/manager.factories.js";
import fs from "fs";
import CustomError from "../utils/errors/custom.error.js";
import { EnumError } from "../utils/errors/enums.errors.js";
import messagesError from "../utils/errors/message.error.js";
import causeError from "../utils/errors/cause.error.js";
import { v4 as uuid } from "uuid";
const manager = await managerFactory.getManager("products");

//METODOS PARA PRODUCTOS

//process data
function processData(products, req) {
  //mapeo de datos de documentos para mostrar la informacion correctamente
  const documents = products.docs.map(
    ({
      _id,
      title,
      description,
      price,
      thumbnail,
      stock,

      category,
      owner,
    }) => ({
      id: _id,
      title,
      description,
      price,
      thumbnail,
      stock,

      category,
      owner,
    })
  );

  //destructuracion de products para utilizar los parametros requeridos
  const { totalPages, page, hasPrevPage, hasNextPage, prevPage, nextPage } =
    products;
  // determinando la urls de las pagina previa y posterior
  const prevUrl = `${req.baseUrl}?${new URLSearchParams({
    ...req.query,
    page: page - 1,
  })}`;
  const nextUrl = `${req.baseUrl}?${new URLSearchParams({
    ...req.query,
    page: page + 1,
  })}`;
  //se contruye un nuevo objeto con el fin de poder mostrar la informacion requerida como lo es por ejemplo el payload o prevLink y nextLink
  const response = {
    totalDocs: products.docs.length,
    totalPages,
    prevPage,
    nextPage,
    page,
    hasNextPage,
    hasPrevPage,
    prevLink: prevPage ? prevUrl : null,
    nextLink: nextPage ? nextUrl : null,
    payload: documents,
  };

  return response;
}
//busca todos los productos
async function find(req) {
  try {
    const queryParams = req.query;
    const title = req.query.title;
    const query = { ...queryParams };
    delete query.page;
    delete query.limit;
    delete query.sort;
    delete query.pagination;

    if (title) {
      query.title = { $regex: new RegExp(title, "i") };
    }

    const options = {
      page: req.query.page || 1,
      limit: req.query.limit || 10,
      sort: req.query.sort || "",
    };

    const foundProducts = await manager.persistFind(query, options);

    const response = processData(foundProducts, req);

    return response;
  } catch (error) {
    return error.message;
  }
}
//busca un producto por id
async function findById(pid) {
  try {
    const response = await manager.persistFindById(pid);

    if (response == null) {
      CustomError.createError({
        cause: causeError.ID_NOT_FOUND,
        message: messagesError.PRODUCT_NOT_FOUND,
        statusCode: 404,
        code: EnumError.PRODUCT_NOT_FOUND,
      });
    }
    return response;
  } catch (error) {
    throw error;
  }
}
//crea un producto
async function create(prod) {
  try {
    prod.code = uuid();
    await manager.persistCreate(prod);
    return "producto fue creado";
  } catch (error) {
    throw error;
  }
}

//populate

async function findProducts() {
  const file = `${process.cwd()}/src/file/product.json`;
  if (fs.existsSync(file)) {
    const data = await fs.promises.readFile(file);
    const response = JSON.parse(data);

    return response;
  }
  return "no se encuentra el archivo";
}

async function populate(product) {
  try {
    const productsWithCodes = product.map((prod) => {
      const code = uuid();
      return { ...prod, code };
    });
    await manager.persistPopulate(productsWithCodes);
    return "productos cargados";
  } catch (error) {
    throw error;
  }
}
//fin populate

//borra todos los productos
async function deleteProduct() {
  try {
    const deletedProducts = await manager.persistDelete();

    if (deletedProducts.deletedCount == 0) {
      const error = new Error("no hay productos para borrar");
      error.code = 404;
      throw error;
    }
    return;
  } catch (error) {
    throw error;
  }
}
// borra un producto por id
async function deleteById(pid) {
  try {
    const productDeleted = await manager.persistDeleteById({ _id: pid });
    if (productDeleted.deletedCount == 0) {
      CustomError.createError({
        cause: causeError.ID_NOT_FOUND,
        message: messagesError.PRODUCT_NOT_FOUND,
        statusCode: 404,
        code: EnumError.PRODUCT_NOT_FOUND,
      });
      next(error);
    }
    return "Producto fue eliminado";
  } catch (error) {
    throw error;
  }
}

async function update(id, ops) {
  try {
    const result = await manager.persistUpdate(id, ops);
    return result;
  } catch (error) {
    throw error;
  }
}
async function verifyOwner(email, id) {
  try {
    const result = await manager.persistVerifyOwner(email, id);
    if (result.modifiedCount == 0) {
      CustomError.createError({
        cause: causeError.ID_NOT_FOUND,
        message: messagesError.PRODUCT_NOT_FOUND,
        statusCode: 404,
        code: EnumError.PRODUCT_NOT_FOUND,
      });
      next(error);
    }
    return result;
  } catch (error) {
    throw error;
  }
}

export {
  deleteById,
  deleteProduct,
  find,
  findById,
  create,
  findProducts,
  populate,
  update,
  verifyOwner,
};

// import productsManager from "../dao/mongo/products.mongo.js";
// const manager = productsManager.getInstance();
