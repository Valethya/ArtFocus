import { useForm } from "react-hook-form";
import Input from "../Form/Input";
import fetchCurrent from "../../services/userService";
import { useDispatch, useSelector } from "react-redux";
import apiRequest from "../../services/api";
import { Link } from "react-router-dom";
import BASE_URL from "../../config";
function Login() {
  const user = useSelector((state) => state.user);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      email: "artfocus@artfocus.com",
      password: "ingrese su password",
    },
  });
  const dispatch = useDispatch();

  const onSubmit = async (dataForm, event) => {
    event.preventDefault();

    const data = await apiRequest("/auth", "POST", dataForm);

    if (data.status == "success") {
      await fetchCurrent(dispatch);
      return null;
    } else {
      console.log("Inicio de sesión fallido: ", data.message);
    }

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
        className="login shadow"
        onSubmit={handleSubmit(onSubmit)}
        onKeyDown={handleKeyDown}
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
        <Link className="register" to="/signup">
          registrate
        </Link>
        <Link className="register" to="/password/reset/request">
          Olvide la contraseña
        </Link>
        <button className="btn">
          <a href={`${BASE_URL}/auth/github`}>
            Entrar con Github
            <img className="icon" src="/img/github.png" />
          </a>
        </button>
        <button className="btn">
          <a href={`${BASE_URL}/auth/google`}>
            Entrar con Google
            <img className="icon" src="/img/google.png" />
          </a>
        </button>
      </form>
    </div>
  );
}
export default Login;
