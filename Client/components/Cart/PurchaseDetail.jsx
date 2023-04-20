import React from "react";
import Button from "../Button/Button.jsx";

export default function PurchaseDetail() {
  return (
    <div className="purchaseDetail shadow">
      <div>
        <h2>Detalles de tu compra</h2>
        <p>Total de prodcutos:</p>
        <p>Valor total:</p>
        <Button>Finalizar compra</Button>
      </div>
    </div>
  );
}
