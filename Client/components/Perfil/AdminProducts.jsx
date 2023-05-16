import { useState } from "react";

import EditProducts from "./EditProducts.jsx";
import CreateProduct from "./createProduct.jsx";

function AdminProducts() {
  const [selectedOpt, setSelectedOpt] = useState("");

  const options = {
    edit: <EditProducts />,
    create: <CreateProduct />,
  };
  const handleOptionClick = (option) => {
    setSelectedOpt(option);
  };
  return (
    <>
      <h2>Administra tus productos</h2>
      <ul className="optionProduct">
        <li onClick={() => handleOptionClick("create")}>
          Crear nuevo producto
        </li>
        <li onClick={() => handleOptionClick("edit")}>Editar productos</li>
      </ul>
      {options[selectedOpt]}
    </>
  );
}
export default AdminProducts;
