import managerFactory from "../factories/manager.factories.js";
import fs from "fs";
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
      status,
      category,
    }) => ({
      id: _id,
      title,
      description,
      price,
      thumbnail,
      stock,
      status,
      category,
    })
  );

  //destructuracion de products para utilizar los parametros requeridos
  const { totalPages, page, hasPrevPage, hasNextPage, prevPage, nextPage } =
    products;
  // determinando la urls de las pagina previa y posterior
  const prevUrl = `${req.protocol}://${req.get("host")}${
    req.baseUrl
  }?${new URLSearchParams({ ...req.query, page: page - 1 })}`;
  const nextUrl = `${req.protocol}://${req.get("host")}${
    req.baseUrl
  }?${new URLSearchParams({ ...req.query, page: page + 1 })}`;

  //se contruye un nuevo objeto con el fin de poder mostrar la informacion requerida como lo es por ejemplo el payload o prevLink y nextLink
  const response = {
    status: "succes",
    payload: documents,
    totalPages,
    prevPage,
    nextPage,
    page,
    hasNextPage,
    hasPrevPage,
    prevLink: prevPage ? prevUrl : null,
    nextLink: nextPage ? nextUrl : null,
  };

  return response;
}
//busca todos los productos
async function find(req) {
  try {
    const status = req.query.status;
    const category = req.query.category;
    const title = req.query.title;

    const query = status
      ? { status: status }
      : category
      ? { category: category }
      : title
      ? { title: title }
      : {};

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
    console.log(response);
    if (response == null) {
      const error = new Error(`El producto con id ${pid} no existe`);
      error.code = 404;
      throw error;
    }
    return response;
  } catch (error) {
    throw error;
  }
}
//crea un producto
async function create(prod) {
  try {
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
    await manager.persistPopulate(product);
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
    const productDeleted = await manager.persistDeleteOne({ _id: pid });
    if (productDeleted.deletedCount == 0) {
      const error = new Error(`El producto con id ${pid} no existe`);
      error.code = 404;
      throw error;
    }
    return;
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

export {
  deleteById,
  deleteProduct,
  find,
  findById,
  create,
  findProducts,
  populate,
  update,
};

// import productsManager from "../dao/mongo/products.mongo.js";
// const manager = productsManager.getInstance();
