import Input from "../Form/Input";
import { useForm } from "react-hook-form";
import Button from "../Button/Button";
import { useState } from "react";
import fetchCurrent from "../../services/userService";
import { useDispatch } from "react-redux";
import BASE_URL from "../../config";

function ChargeProfile({ user, setDisplayOverlay, displayOverlay }) {
  const [previewImage, setPreviewImage] = useState(null);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm();
  const dispatch = useDispatch();

  const url = `${BASE_URL}/api/users/${user.user.email}`;
  const onSubmit = async (dataForm, event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("profile", dataForm.profile[0]);
    try {
      const response = await fetch(url, {
        method: "PATCH",
        credentials: "include",
        body: formData,
      });

      const data = await response.json();
      if (data.status == "success") {
        console.log("pasando");
        fetchCurrent(dispatch);
        setDisplayOverlay(!displayOverlay);
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleImageChange = (e) => {
    console.log("hola!!!!!!");
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
      console.log(reader.readAsDataURL(file));
    } else {
      setPreviewImage(null);
    }
  };
  const handleKeyDown = (event, dataForm) => {
    if (event.key == "Enter") {
      const formData = new FormData();
      formData.append("profile", dataForm.profile[0]);
      event.preventDefault();
      onSubmit(formData, event);
    }
  };

  return (
    <div className="chargeProfile">
      <form
        action=""
        onSubmit={handleSubmit(onSubmit)}
        onKeyDown={handleKeyDown}
      >
        <h3>Foto de perfil</h3>
        <p>Porfavor, busque una foto para su perfil :)</p>
        <Input
          label="Foto"
          type="file"
          name="profile"
          register={register}
          required={{ value: true, message: "Ingrese una imagen" }}
          handle={handleImageChange}
        />
        {previewImage && ( // Mostrar la vista previa solo si hay una imagen seleccionada
          <div style={{ width: "250px", height: "auto", padding: "2em" }}>
            <img
              src={previewImage}
              alt="Vista previa de la imagen"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
              }}
            />
          </div>
        )}
        {errors.profile && (
          <span className="invalid">{errors.image.message}</span>
        )}
        <Button handle={handleSubmit} type={"submit"}>
          {" "}
          guardar
        </Button>
      </form>
    </div>
  );
}
export default ChargeProfile;
