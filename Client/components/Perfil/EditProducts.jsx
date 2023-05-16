import { useContext, useState, useEffect } from "react";
import { ApiContext } from "../../context/ApiContext";
import { Icon } from "@mui/material";
import Pagination from "../Pagination/pagination";
function EditProducts() {
  const { products, user, fetchProducts, urlPage } = useContext(ApiContext);
  console.log(user.email);
  const filteredProducts = products.filter((prod) => prod.owner === user.email);

  useEffect(() => {
    fetchProducts(urlPage);
  }, [JSON.stringify(urlPage)]);

  async function handleDelete(id) {
    console.log(id, "esto es id en delete");
    const url = `http://localhost:8080/api/products/${id}`;
    try {
      const response = await fetch(url, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response, "esta es la respuesta");
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }
  function truncateText(text, maxLength) {
    if (text.length <= maxLength) {
      return text;
    }
    return text.slice(0, maxLength) + "...";
  }
  return (
    <>
      {" "}
      <table className="productsTable">
        <thead>
          <tr>
            <th>Title</th>
            <th>Thumbnail</th>
            <th>descripcion</th>
            <th>price</th>
            <th>stock</th>
            <th>category</th>
            <th>code</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((prod, index) => {
            const truncatedDescription = truncateText(prod.description, 35);
            const rowClass = index % 2 === 0 ? "evenRow" : "";
            return (
              <tr key={prod.id} className={rowClass}>
                <td>{prod.title}</td>
                <td className="tdThumbnail">
                  <img src={prod.thumbnail} />
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
      <Pagination />
    </>
  );
}
export default EditProducts;
