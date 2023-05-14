import { StrictMode } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./assets/style/normalize.css";
import "./assets/style/main.scss";
import Catalog from "../layouts/catalog.layouts.jsx";
import HomePage from "../layouts/homePage.layouts.jsx";
import CartLayout from "../layouts/cart.layout.jsx";
import PasswordReset from "../layouts/passwordReset.layout.jsx";
import PasswordResetRequest from "../layouts/passwordResetRequest.layout.jsx";
import SignUp from "../components/Login/SignUp.jsx";

function App() {
  return (
    <Router>
      <StrictMode>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/Cuadros" element={<Catalog />}></Route>
          <Route path="/Cart" element={<CartLayout />}></Route>
          <Route
            path="/password/reset/request"
            element={<PasswordResetRequest />}
          ></Route>
          <Route path="/password/reset" element={<PasswordReset />}></Route>
          <Route path="/signUp" element={<SignUp />}></Route>
        </Routes>
      </StrictMode>
    </Router>
  );
}

export default App;
