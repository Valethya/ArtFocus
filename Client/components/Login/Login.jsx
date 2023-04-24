import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import Input from "../Form/Input";
import { ApiContext } from "../../context/ApiContext";
function Login({ display }) {
  const { getCurrentSession } = useContext(ApiContext);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      email: "artfocus@artfocus.com",
      password: "ingrese su password",
    },
  });

  const url = "http://localhost:8080/auth";

  const onSubmit = async (dataForm, event) => {
    event.preventDefault();

    try {
      const response = await fetch(url, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataForm),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
    getCurrentSession();

    setValue("email");
    setValue("password");
  };

  const handleKeyDown = (event, dataForm) => {
    if (event.key == "Enter") {
      event.preventDefault();
      onSubmit(dataForm, event);
    }
  };
  return (
    <div>
      <form
        action=""
        className="formLogin shadow"
        onSubmit={handleSubmit(onSubmit)}
        onKeyDown={handleKeyDown}
        style={{ display: display }}
      >
        <Input label="email" register={register} required />
        {errors.email?.type === "required" && (
          <p className="invalid" role="alert">
            Email campo es requerido
          </p>
        )}
        <Input label="password" register={register} required />
        {errors.password?.type === "required" && (
          <p className="invalid" role="alert">
            Password campo es requerido
          </p>
        )}
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
