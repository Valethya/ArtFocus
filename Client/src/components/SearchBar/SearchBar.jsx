import { Icon } from "@mui/material";
import Input from "../Form/Input";
import { useForm } from "react-hook-form";

function SearchBar({ name, register }) {
  const {
    formState: { errors },
  } = useForm();
  return (
    <div className="searchBar">
      <Input type="search" name={name} register={register}></Input>
      <Icon className="searchIcon">search</Icon>
    </div>
  );
}
export default SearchBar;
