import { StrictMode } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";
import "./assets/style/normalize.css";
import "./assets/style/main.scss";
import Header from "../components/NavBar/Header";
import CardContainer from "../components/Container/CardContainer";
import Container from "../components/Container/Container";
import Cart from "../components/Cart/Cart";
function App() {
  return (
    <Router>
      <NavBar />

      <StrictMode>
        <Routes>
          <Route path="/" element={<Header />}></Route>
          <Route
            path="/cuadros"
            element={
              <Container>
                <CardContainer />
              </Container>
            }
          ></Route>
          <Route
            path="/cart"
            element={
              <Container>
                <Cart />
              </Container>
            }
          ></Route>
        </Routes>
      </StrictMode>
    </Router>
  );
}

export default App;
