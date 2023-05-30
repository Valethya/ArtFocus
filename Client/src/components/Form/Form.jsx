import { useContext } from "react";
import { useForm } from "react-hook-form";

import { ApiContext } from "../../context/ApiContext";
function Form({ url, children, style, messageButton }) {
  const { fetchPost } = useContext(ApiContext);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm({});

  const onSubmit = async (dataForm, event) => {
    event.preventDefault();
    try {
      const post = fetchPost(url, dataForm);
      const data = await post.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const handleKeyDown = (event, dataForm) => {
    if (event.key == "Enter") {
      event.preventDefault();
      onSubmit(dataForm, event);
    }
  };

  return (
    <div>
      <form
        action=""
        className={style}
        onSubmit={handleSubmit(onSubmit)}
        onKeyDown={handleKeyDown}
        // style={{ display: display && display }}
      >
        {children}
        <button className="btn" type="submit">
          {messageButton}
        </button>
      </form>
    </div>
  );
}
export default Form;
