import { useForm } from "react-hook-form";
import Button from "../Button/Button.jsx";
import Input from "../Form/Input.jsx";

function PasswordResetForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const newPassword = watch("newPassword");
  const validateConfirmPassword = (value) => {
    if (value !== newPassword) {
      return "Las contraseñas no coinciden";
    }
  };
  const url = "http://localhost:8080/users/password/reset";

  const onSubmit = async (dataForm, event) => {
    event.preventDefault();
    try {
      const response = await fetch(url, {
        method: "PUT",
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
      <h3>Restablece tu de clave</h3>
      <p>Ingresa tu nueva contraseña</p>
      <br></br>
      <Input
        label="nueva contraseña"
        type="password"
        name="newPassword"
        register={register}
        required={{ value: true, message: "Ingrese su correo electrónico" }}
      />
      {errors.newPassword && (
        <span className="invalid">{errors.newPassword.message}</span>
      )}
      <Input
        label="confirmar contraseña"
        type="password"
        name="confirmPassword"
        register={register}
        validate={validateConfirmPassword}
        required={{ value: true, message: "Ingrese su correo electrónico" }}
      />
      {errors.confirmPassword && (
        <span className="invalid">{errors.confirmPassword.message}</span>
      )}
      <Button type="submit">Enviar</Button>
    </form>
  );
}

export default PasswordResetForm;
