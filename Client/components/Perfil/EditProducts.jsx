import { useContext, useState, useEffect } from "react";
import { ApiContext } from "../../context/ApiContext";
import { Icon } from "@mui/material";
import Pagination from "../Pagination/pagination";
function EditProducts() {
  const { user } = useContext(ApiContext);

  ///FEEEETCHHHHH
  const [products, setProducts] = useState([]);
  const [url, setUrl] = useState("http://localhost:8080/api/products");
  const [page, setPage] = useState("");

  const urlFilter = `${url}?owner=${user.email}`;

  async function fetchProducts() {
    try {
      const response = await fetch(urlFilter);
      const data = await response.json();
      setPage(data.data);
      setProducts(data.data.payload);
      return data.data;
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    fetchProducts();
  }, [JSON.stringify(url)]);

  function handlePage(urlPage) {
    setUrl(urlPage);
  }

  //////FIN FECTH

  async function handleDelete(id) {
    const url = `http://localhost:8080/api/products/${id}`;
    try {
      const response = await fetch(url, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      fetchProducts();
      console.log("Borrado exitosamente");
    } catch (error) {
      console.error(error);
    }
  }
  function truncateText(text, maxLength) {
    if (text.length <= maxLength) {
      return text;
    }
    return text.slice(0, maxLength) + "...";
  }
  console.log(!products, "esto es productos");
  return (
    <>
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
    </>
  );
}
export default EditProducts;
