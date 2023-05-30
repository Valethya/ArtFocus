import { useState, useEffect } from "react";
import { Icon } from "@mui/material";
import Pagination from "../Pagination/pagination";
import FilterBar from "../FilterBar/FileterBar";
import { useSelector } from "react-redux";
import apiRequest from "../../services/api";
import {
  fetchProducts,
  createUrlFilter,
} from "../../services/productService.js";
import { truncateText } from "../../utils";

function EditProducts() {
  const user = useSelector((state) => state.user.user);
  const role = useSelector((state) => state.user.role);
  const [products, setProducts] = useState([]);
  const [url, setUrl] = useState("/api/products");
  const [page, setPage] = useState("");

  const urlFilter = createUrlFilter(url, role, user);
  console.log(urlFilter);
  useEffect(() => {
    fetchProducts(urlFilter, setPage, setProducts);
  }, [JSON.stringify(url)]);

  function handlePage(urlPage) {
    setUrl(urlPage);
  }

  //////FIN FECTH

  async function handleDelete(id) {
    const url = `/api/products/${id}`;
    try {
      apiRequest(url, "DELETE");
      fetchProducts(urlFilter, setPage, setProducts);
      console.log("Borrado exitosamente");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <FilterBar url={setUrl} />
      {products.length == 0 ? (
        <h3>No tienes ningun producto creado por ti :(</h3>
      ) : (
        <>
          <table className="productsTable">
            <thead>
              <tr>
                <th>Title</th>
                <th>Thumbnail</th>
                <th>Descripción</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Categoría</th>
                <th>Código</th>
              </tr>
            </thead>
            <tbody>
              {products.map((prod, index) => {
                const truncatedDescription = truncateText(prod.description, 35);
                const rowClass = index % 2 === 0 ? "evenRow" : "";
                return (
                  <tr key={prod.id} className={rowClass}>
                    <td>{prod.title}</td>
                    <td className="tdThumbnail">
                      <img src={prod.thumbnail} alt="Thumbnail" />
                    </td>
                    <td>{truncatedDescription}</td>
                    <td>{prod.price}</td>
                    <td>{prod.stock}</td>
                    <td>{prod.category}</td>
                    <td>{prod.code}</td>
                    <td className="edit">
                      <div>
                        <Icon
                          className="delete"
                          onClick={() => handleDelete(prod.id)}
                        >
                          delete
                        </Icon>
                        <button className="btnEdit">Editar</button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <Pagination page={page} handle={handlePage} />
        </>
      )}
    </div>
  );
}
export default EditProducts;
