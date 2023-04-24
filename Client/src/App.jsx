import { StrictMode, useContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./assets/style/normalize.css";
import "./assets/style/main.scss";
import Catalog from "../layouts/catalog.layouts";
import HomePage from "../layouts/homePage.layouts";
import CartLayout from "../layouts/cart.layout";
import { ApiContext, ApiContextProvider } from "../context/ApiContext";

function App() {
  const { getCurrentSession } = useContext(ApiContext);
  useEffect(() => {
    getCurrentSession();
  }, []);
  return (
    <Router>
      <StrictMode>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/Cuadros" element={<Catalog />}></Route>
          <Route path="/Cart" element={<CartLayout />}></Route>
        </Routes>
      </StrictMode>
    </Router>
  );
}

export default App;
