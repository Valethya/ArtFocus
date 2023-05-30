import React from "react";
import { Link } from "react-router-dom";
import Avatar from "../Avatar/Avatar";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Logo from "../Logo/Logo";
import Login from "../Login/Login";
import UserAccount from "../UserAccount/UserAccount";
import { useSelector } from "react-redux";
import CartIcon from "./CartIcon";

// nombre de las paginas
const pages = ["Cuadros", "Blog", "Nosotros"];
// const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];{/*los setting del menu desplegable del usuario*/}

function NavBar() {
  const [showNav, setShowNav] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [color, setColor] = useState(["white", "none"]);
  const [shad, setShad] = useState("");
  const location = useLocation();
  const [display, setDisplay] = useState("none");

  const user = useSelector((state) => state.user);
  const role = useSelector((state) => state.user.role);

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
      let header = document.querySelector(".header");
      let heightHeader = header.clientHeight;
      let nav = document.querySelector(".navBar");
      let heightNav = nav.clientHeight;
      let totalHeight = heightHeader - heightNav;
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
    if (user.user) {
      setDisplay("none");
    } else {
      setDisplay(display === "flex" ? "none" : "flex");
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
          {role == "premium" || role == "user" ? (
            <li id="iconCart" key="cart">
              <CartIcon />
            </li>
          ) : (
            ""
          )}
          <li id="liAvatar" key="avatar">
            <Avatar user={user.user} handle={handleLogin} />
          </li>
        </ul>
        <UserAccount user={user.user} />
      </nav>
      <Login display={display} />
    </>
  );
}

export default NavBar;
