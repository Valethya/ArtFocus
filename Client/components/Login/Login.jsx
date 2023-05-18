import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import Input from "../Form/Input";
import { ApiContext } from "../../context/ApiContext";
function Login({ display }) {
  const { getCurrentSession, user } = useContext(ApiContext);

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

  if (user) {
    return null;
  }
  return (
    <div>
      <form
        action=""
        className="login shadow"
        onSubmit={handleSubmit(onSubmit)}
        onKeyDown={handleKeyDown}
        style={{ display: display }}
      >
        <Input
          label="email"
          type="email"
          name="email"
          register={register}
          required={{ value: true, message: "Ingrese su correo electrónico" }}
        />
        {errors.email && (
          <span className="invalid">{errors.email.message}</span>
        )}
        <Input
          label="contraseña"
          type="password"
          name="password"
          register={register}
          required={{ value: true, message: "Ingrese su contraseña" }}
        />
        {errors.password && (
          <span className="invalid">{errors.password.message}</span>
        )}
        <button className="btn" type="submit">
          Iniciar Sesión
        </button>
        <a className="register" href="/signup">
          registrate
        </a>
        <a className="register" href="/password/reset/request">
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
