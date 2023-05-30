import { useContext } from "react";
import { useForm } from "react-hook-form";
import Input from "../Form/Input.jsx";
import { ApiContext } from "../../context/ApiContext.jsx";
import Select from "../Form/Select.jsx";

function CreateProduct() {
  const { getCurrentSession } = useContext(ApiContext);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      title: "Fotografia",
      description: "Hermosa fotografia",
      image: "Ingrese la url de su imagen",
      price: 15000,
      stock: 20,
      category: "alguna",
    },
  });
  const category = [
    { op: "blanco y negro", value: "blanco y negro" },
    { op: "color", value: "color" },
  ];
  const url = "http://localhost:8080/api/products";

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
    <form
      action=""
      className="createProduct"
      onSubmit={handleSubmit(onSubmit)}
      onKeyDown={handleKeyDown}
    >
      <Input
        label="Titulo"
        type="name"
        name="title"
        register={register}
        required={{ value: true, message: "Ingrese su nombre" }}
      />
      {errors.title && <span className="invalid">{errors.title.message}</span>}
      <Input
        label="Descripcion"
        type="lastName"
        name="description"
        register={register}
        required={{ value: true, message: "Ingrese su nombre" }}
      />
      {errors.description && (
        <span className="invalid">{errors.description.message}</span>
      )}
      <Input
        label="Url de la imagen"
        type="text"
        name="image"
        register={register}
        required={{ value: true, message: "Ingrese una url" }}
      />
      {errors.image && <span className="invalid">{errors.image.message}</span>}
      <Input
        label="Precio"
        type="number"
        name="price"
        register={register}
        required={{ value: true, message: "Ingrese su edad" }}
      />
      {errors.price && <span className="invalid">{errors.price.message}</span>}
      <Input
        label="Stock"
        type="number"
        name="stock"
        register={register}
        required={{ value: true, message: "Ingrese su correo electrónico" }}
      />
      {errors.stock && <span className="invalid">{errors.stock.message}</span>}
      <Select
        register={register}
        options={category}
        required={{ value: true, message: "Selecciona una categoria" }}
        name="category"
      />
      {errors.category && (
        <span className="invalid">{errors.category.message}</span>
      )}
      <button className="btn" type="submit">
        Crear producto
      </button>
    </form>
  );
}
export default CreateProduct;
