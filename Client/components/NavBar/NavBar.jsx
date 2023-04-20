import React from "react";
import { Link } from "react-router-dom";
import Avatar from "../Avatar/avatar";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Logo from "../Logo/Logo";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const pages = ["Cuadros", "Blog"];
// const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];{/*los setting del menu desplegable del usuario*/}

function NavBar() {
  const [showNav, setShowNav] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  const [color, setColor] = useState(["white", "none"]);
  const [shad, setShad] = useState("");

  const location = useLocation();

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

  return (
    <nav
      className={`navBar ${shad}`}
      style={{ top: showNav ? "0" : "-10vh", background: color[0] }}
    >
      <ul>
        <li key="logo">
          <Link to="/" className="linkNav">
            <Logo></Logo>
          </Link>
        </li>
        {pages.map((page) => {
          return (
            <li className="page" key={page}>
              <Link to={page} className="linkNav">
                {page}
              </Link>
            </li>
          );
        })}
        <li className="liAvatar" key="avatar">
          <Avatar />
        </li>
        <li className="iconCart" key="cart">
          <Link to={"/cart"}>
            <ShoppingCartIcon />
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
