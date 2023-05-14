import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Avatar from "../Avatar/Avatar";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Logo from "../Logo/Logo";

import Icon from "@mui/material/Icon";
import Login from "../Login/Login";
import { ApiContext } from "../../context/ApiContext";
const pages = ["Cuadros", "Blog", "Nosotros"];
// const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];{/*los setting del menu desplegable del usuario*/}

function NavBar() {
  const [showNav, setShowNav] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [color, setColor] = useState(["white", "none"]);
  const [shad, setShad] = useState("");
  const { user } = useContext(ApiContext);
  const location = useLocation();
  const [display, setDisplay] = useState("none");

  //cambiar de color y agrega sombra al nav segun este en el home o no
  useEffect(() => {
    if (location.pathname == "/") {
      setColor(["none"]);
    } else {
      setColor(["white"]);
      setShad("shadow");
    }
  }, [location.pathname]);

  //oculta el nav cuando bajamos con el scroll y lo muestra al subir
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      if (prevScrollPos > currentScrollPos) {
        setShowNav(true);
      } else {
        setShowNav(false);
      }
      setPrevScrollPos(currentScrollPos);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  //cambia el background del nav y agrega un shadow de acuerdo al scroll en el home
  useEffect(() => {
    if (location.pathname == "/") {
      let img = document.querySelector(".header");
      let heightImg = img.clientHeight;
      let nav = document.querySelector(".navBar");
      let heightNav = nav.clientHeight;
      let totalHeight = heightImg - heightNav;
      const currentScrollPos = window.pageYOffset;

      if (currentScrollPos >= totalHeight) {
        setColor(["white"]);
        setShad("shadow");
      } else if (currentScrollPos < totalHeight) {
        setColor(["none"]);
        setShad("");
      }
    }
  }, [location.pathname, window.pageYOffset]);
  //mostrar u ocultar login
  const handleLogin = () => {
    if (user) {
      setDisplay("none");
    } else if (display == "flex") {
      setDisplay("none");
    } else {
      setDisplay("flex");
    }
  };

  return (
    <>
      <nav
        className={`navBar ${shad}`}
        style={{ top: showNav ? "0" : "-10vh", background: color[0] }}
      >
        <Link to="/" className="linkNav">
          <Logo></Logo>
        </Link>
        <ul>
          {pages.map((page) => {
            return (
              <li className="page" key={page}>
                <Link to={`/${page}`} className="linkNav">
                  {page}
                </Link>
              </li>
            );
          })}

          <li id="iconCart" key="cart">
            <Link to={"/Cart"}>
              <Icon>shopping_cart</Icon>
            </Link>
          </li>
          <li id="liAvatar" key="avatar">
            <Avatar handle={handleLogin} />
          </li>
        </ul>
        <div className="dataUserBox">
          <span className="dataUser">{user ? user.name : ""}</span>
          <span className="dataUser">{user ? user.email : ""}</span>
        </div>
      </nav>
      <Login display={display} />
    </>
  );
}

export default NavBar;
