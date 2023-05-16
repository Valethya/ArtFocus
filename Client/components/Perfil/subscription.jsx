import { useContext, useEffect, useState } from "react";
import Button from "../Button/Button";
import { ApiContext } from "../../context/ApiContext";

function Subscription() {
  const { user, getCurrentSession } = useContext(ApiContext);
  const [message, setMessage] = useState("Empezar Suscripcion");
  const userId = user.email;
  console.log(user.role, "mirame");
  const susbscription = async () => {
    try {
      const url = `http://localhost:8080/users/premium/${userId}`;
      const response = await fetch(url, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const responseData = await response.json();
      getCurrentSession();
      console.log(responseData);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (user.role == "premium") {
      setMessage("Terminar suscripcion");
    } else {
      setMessage("Empezar suscripcion");
    }
  }, [JSON.stringify(user)]);
  return (
    <div className="subscription">
      <h2>Suscripcion</h2>
      <p>Conviertete en un usuario Premium y obtendras multiples beneficios</p>
      <Button handle={susbscription}>{message}</Button>
    </div>
  );
}
export default Subscription;
