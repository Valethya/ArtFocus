import { useContext, useState } from "react";
import Overlay from "../Overlay/Overlay";
import { setRef } from "@mui/material";

function Login({ display }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const url = "http://localhost:8080/auth";

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (message === undefined) {
      event.preventDefault();
    }
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataMessage),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
    setEmail("");
    setPassword("");
  };
  const handleChange = (event) => {
    event.preventDefault();
    setEmail(event.target.value);
    setPassword(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key == "Enter" && message === undefined) {
      event.preventDefault();
    }
    if (event.key == "Enter" && message !== undefined) {
      handleSubmit(event);
    }
  };
  return (
    <div>
      <form action="" className="formLogin shadow" style={{ display: display }}>
        <label htmlFor="">
          Usuario{" "}
          <input placeholder="Ingresa tu email..." type="email" name="email" />
        </label>

        <label htmlFor="">
          Password{" "}
          <input
            placeholder="Ingresa tu contraseña..."
            type="password"
            name="password"
          />
        </label>

        <button className="btn" type="submit">
          Iniciar Sesión
        </button>
        <a className="register" href="/signup">
          registrate
        </a>
        <a className="register" href="forgotPassword">
          Olvide la contraseña
        </a>
        <button className="btn">
          <a href="/auth/github">
            Entrar con Github
            <img className="icon" src="/img/github.png" />
          </a>
        </button>
        <button className="btn">
          <a href="/auth/google">
            Entrar con Google
            <img className="icon" src="/img/google.png" />
          </a>
        </button>
      </form>
    </div>
  );
}
export default Login;
