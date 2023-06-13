import { useEffect, useState } from "react";
import Button from "../Button/Button";
import apiRequest from "../../services/api";
import { useDispatch, useSelector } from "react-redux";
import fetchCurrent from "../../services/userService";
import { useForm } from "react-hook-form";
import Input from "../Form/Input";

function Subscription() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [message, setMessage] = useState("Empezar Suscripcion");
  const email = useSelector((state) => state.user.user.email);
  const role = useSelector((state) => state.user.role);
  const document = useSelector((state) => state.user.user.document);
  const [enabled, setEnabled] = useState(false);
  const dispatch = useDispatch();
  const susbscriptionFetch = async () => {
    const response = await apiRequest(`/api/users/premium/${email}`, "POST");
    console.log(response);
    if (response.status == "success") {
      fetchCurrent(dispatch);
    }
  };

  const onSubmit = async (dataForm, event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("identification", dataForm.identification[0]);
    formData.append("proofOfResidence", dataForm.proofOfResidence[0]);
    formData.append("accountStatementProof", dataForm.accountStatementProof[0]);
    // await apiRequest(`/api/users/${email}/document`, "POST", dataForm);
    try {
      const response = await fetch(
        `http://localhost:8080/api/users/${email}/document`,
        {
          method: "POST",
          credentials: "include",
          body: formData,
        }
      );

      const data = await response.json();
      if (data.status == "success") {
        setEnabled(true);
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleKeyDown = (event, dataForm) => {
    if (event.key == "Enter") {
      const formData = new FormData();
      formData.append("identification", dataForm.identification);
      formData.append("proofOfResidence", dataForm.proofOfResidence);
      formData.append("accountStatementProof", dataForm.accountStatementProof);

      event.preventDefault();
      onSubmit(formData, event);
    }
  };
  useEffect(() => {
    if (role == "premium") {
      setMessage("Terminar suscripcion");
    } else {
      setMessage("Empezar suscripcion");
    }
  }, [JSON.stringify(role)]);
  return (
    <div className="cont">
      <div className="subcription">
        <p>
          Conviertete en un usuario Premium y obtendras multiples beneficios.
        </p>
        <p>
          Para hacerlo debes subir todos los documentos indicados en el
          formulario.
        </p>
        <form
          action=""
          // className="login shadow"
          onSubmit={handleSubmit(onSubmit)}
          onKeyDown={handleKeyDown}
        >
          <Input
            label="Documento de identificacion"
            type="file"
            name="identification"
            register={register}
            required={{
              value: true,
              message: "Porfavor suba los documentos requeridos",
            }}
          />
          {errors.identification && (
            <span className="invalid">{errors.identification.message}</span>
          )}
          <Input
            label="Comprobante de domicilio"
            type="file"
            name="proofOfResidence"
            register={register}
            required={{
              value: true,
              message: "Porfavor suba los documentos requeridos",
            }}
          />
          {errors.proofOfResidence && (
            <span className="invalid">{errors.proofOfResidence.message}</span>
          )}
          <Input
            label="Comprobante de estado de cuenta"
            type="file"
            name="accountStatementProof"
            register={register}
            required={{
              value: true,
              message: "Porfavor suba los documentos requeridos",
            }}
          />
          {errors.accountStatementProof && (
            <span className="invalid">
              {errors.accountStatementProof.message}
            </span>
          )}
          <Button
            enabled={enabled}
            className={enabled ? "disabled" : ""}
            type={"submit"}
          >
            Enviar documentos
          </Button>
        </form>
        <Button
          handle={susbscriptionFetch}
          disabled={document ? true : false}
          className={document ? "" : "disabled"}
        >
          {message}
        </Button>
      </div>
    </div>
  );
}
export default Subscription;
