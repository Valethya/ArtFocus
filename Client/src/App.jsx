import { StrictMode } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";
import "./assets/style/normalize.css";
import "./assets/style/main.scss";

import Header from "../components/NavBar/Header";
import CardContainer from "../components/Container/CardContainer";
import Container from "../components/Container/Container";
import Cart from "../components/Cart/Cart";
import Chat from "../components/Chat/chat";
function App() {
  return (
    <Router>
      <StrictMode>
        <NavBar />
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
        <Chat></Chat>
        <div className="iconChat shadow">chat</div>
      </StrictMode>
    </Router>
  );
}

export default App;
