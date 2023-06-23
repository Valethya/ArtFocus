import { useForm } from "react-hook-form";

function Input({ type, label, name, register, required, validate, handle }) {
  const {
    formState: { errors },
  } = useForm();

  return (
    <>
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        {...register(name, { required, validate })}
        aria-invalid={errors[name] ? "true" : "false"}
        onChange={handle}
      />
    </>
  );
}
export default Input;
