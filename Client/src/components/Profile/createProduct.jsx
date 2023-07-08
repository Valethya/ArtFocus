import { useForm } from "react-hook-form";
import Input from "../Form/Input.jsx";
import Select from "../Form/Select.jsx";
import BASE_URL from "../../config.js";

function CreateProduct() {
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
  const url = `${BASE_URL}/api/products`;

  const onSubmit = async (dataForm, event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("title", dataForm.title);
    formData.append("description", dataForm.description);
    formData.append("price", dataForm.price);
    formData.append("stock", dataForm.stock);
    formData.append("category", dataForm.category);
    formData.append("image", dataForm.image[0]);
    try {
      const response = await fetch(url, {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleKeyDown = (event, dataForm) => {
    if (event.key == "Enter") {
      const formData = new FormData();
      formData.append("title", dataForm.title);
      formData.append("description", dataForm.description);
      formData.append("price", dataForm.price);
      formData.append("stock", dataForm.stock);
      formData.append("category", dataForm.category);
      formData.append("image", dataForm.image[0]);
      event.preventDefault();
      onSubmit(formData, event);
    }
  };
  return (
    <form
      action=""
      className="createProduct"
      encType="multipart/form-data"
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
        type="file"
        name="image"
        register={register}
        required={{ value: true, message: "Ingrese una imagen" }}
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
