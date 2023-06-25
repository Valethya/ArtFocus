import SearchBar from "../SearchBar/SearchBar.jsx";
import Select from "../Form/Select.jsx";
import { useForm } from "react-hook-form";

function FilterBar({ url }) {
  const BASE_URL = "https://artfocus-production.up.railway.app";
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm({});
  const optionsPrice = [
    { op: "precio", value: "" },
    { op: "de menor precio", value: "-price" },
    { op: "de mayor precio", value: "price" },
  ];

  const category = [
    { op: "categoria", value: "" },
    { op: "blanco y negro", value: "blanco y negro" },
    { op: "color", value: "color" },
  ];
  const onSubmit = (data, event) => {
    event.preventDefault();
    const baseUrl = `${BASE_URL}/api/products`;
    const query = Object.entries(data)
      .filter(([key, value]) => value !== "")
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join("&");
    const fullUrl = `${baseUrl}?${query}&`;
    url(fullUrl);
  };
  const handleKeyDown = (event, data) => {
    if (event.key == "Enter") {
      event.preventDefault();
      handleSubmit(onSubmit(data, event));
    }
  };
  return (
    <form
      action=""
      className="filterBar"
      onChange={handleSubmit(onSubmit)}
      onKeyDown={handleKeyDown}
    >
      <SearchBar
        register={register}
        name="title"
        required={{ value: false }}
        onChange={handleSubmit(onSubmit)}
        onKeyDown={handleKeyDown}
      />
      <Select
        register={register}
        options={optionsPrice}
        name="sort"
        required={{ value: false }}
        onChange={handleSubmit(onSubmit)}
        onKeyDown={handleKeyDown}
      />
      <Select
        register={register}
        options={category}
        name="category"
        required={{ value: false }}
        onChange={handleSubmit(onSubmit)}
        onKeyDown={handleKeyDown}
      />
    </form>
  );
}
export default FilterBar;
