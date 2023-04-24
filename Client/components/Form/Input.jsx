import { useForm } from "react-hook-form";

function Input({ label, register, required }) {
  const {
    formState: { errors },
  } = useForm();
  return (
    <>
      <label>{label}</label>
      <input
        type={label}
        {...register(label, { required })}
        aria-invalid={errors[label] ? "true" : "false"}
      />
    </>
  );
}
export default Input;
