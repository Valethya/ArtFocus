import { useForm } from "react-hook-form";
import Input from "../Form/Input";
import Frame from "../Frame/Frame";
import { useNavigate } from "react-router-dom";
function SignUp() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      firstName: "Valentina ",
      lastName: "Rojas",
      age: 15,
      email: "valenthinarojasr@gmail.com",
      password: "qwerty",
    },
  });

  const url = "http://localhost:8080/api/users";

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
      if (data.status == "success") {
        navigate("/");
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    }

    // setValue("email");
    // setValue("password");
  };

  const handleKeyDown = (event, dataForm) => {
    if (event.key == "Enter") {
      event.preventDefault();
      onSubmit(dataForm, event);
    }
  };
  return (
    <div className="center">
      <Frame>
        <form
          action=""
          className="signUp"
          onSubmit={handleSubmit(onSubmit)}
          onKeyDown={handleKeyDown}
        >
          <h2>registro</h2>
          <Input
            label="Nombre"
            type="name"
            name="firstName"
            register={register}
            required={{ value: true, message: "Ingrese su nombre" }}
          />
          {errors.name && (
            <span className="invalid">{errors.name.message}</span>
          )}
          <Input
            label="Apellido"
            type="lastName"
            name="lastName"
            register={register}
            required={{ value: true, message: "Ingrese su nombre" }}
          />
          {errors.name && (
            <span className="invalid">{errors.name.message}</span>
          )}
          <Input
            label="Edad"
            type="number"
            name="age"
            register={register}
            required={{ value: true, message: "Ingrese su edad" }}
          />
          {errors.edad && (
            <span className="invalid">{errors.edad.message}</span>
          )}
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
            Registrarse
          </button>
        </form>
      </Frame>
    </div>
  );
}
export default SignUp;
