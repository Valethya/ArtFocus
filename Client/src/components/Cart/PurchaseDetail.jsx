import React from "react";
import Button from "../Button/Button.jsx";
import { fetchSummaryCart } from "../../services/cartService.js";
import apiRequest from "../../services/api.js";

export default function PurchaseDetail() {
  const [summaryCart, setSummaryCart] = useState("");
  const cartId = useSelector((state) => state.user.cartId);

  useEffect(() => {
    fetchSummaryCart(setSummaryCart, cartId);
    console.log(setSummaryCart, "esto es el resumen de compra");
  }, [cartId]);

  const url = `/api/carts/${cartId}/purchase`;
  function handlePurchase() {
    apiRequest(url, "POST");
  }
  return (
    <>
      <h2>Detalles de tu compra</h2>
      <p>Total de prodcutos:</p>
      <p>Valor total:</p>
      <Button handle={handlePurchase}>Finalizar compra</Button>
    </>
  );
}
