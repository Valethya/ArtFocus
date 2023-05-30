import { useForm } from "react-hook-form";

const Select = ({ register, options, required, name, validate }) => {
  const {
    formState: { errors },
  } = useForm();

  return (
    <div>
      <select
        {...register(name, { required, validate })}
        aria-invalid={errors[name] ? "true" : "false"}
      >
        {" "}
        {options.map((op) => (
          <option key={op.op} value={op.value}>
            {op.op}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
