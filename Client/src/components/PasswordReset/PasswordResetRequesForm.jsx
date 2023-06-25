import { useForm } from "react-hook-form";
import Button from "../Button/Button.jsx";
import Input from "../Form/Input.jsx";

function PasswordResetRequestForm() {
  const BASE_URL = "https://artfocus-production.up.railway.app";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const url = `${BASE_URL}/users/password/reset/request`;

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
  };

  return (
    <form className="recoverPassword" onSubmit={handleSubmit(onSubmit)}>
      <h3>recuperacion de clave</h3>
      <p>porfavor ingresa el email con el que estas resgistrado</p>
      <br></br>
      <Input
        label="email"
        type="email"
        name="email"
        register={register}
        required={{ value: true, message: "Ingrese su correo electrónico" }}
        errors={errors}
      />
      {errors.email && <span className="invalid">{errors.email.message}</span>}
      <Button type="submit">Enviar</Button>
    </form>
  );
}

export default PasswordResetRequestForm;
