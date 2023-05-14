import React, { createContext, useContext, useState } from "react";
export const ApiContext = createContext();
export function ApiContextProvider({ children }) {
  const [user, setUser] = useState("");
  const [cartId, setCartId] = useState("");

  async function getCurrentSession() {
    try {
      const response = await fetch("http://localhost:8080/session/current", {
        credentials: "include",
      });

      if (!response) {
        throw new Error("response not OK");
      }
      const data = await response.json();
      const cart = data.data;
      setUser(data.data);
      setCartId(cart.cartId);
      setTimeout(() => {
        setUser("");
      }, 180000);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <ApiContext.Provider value={{ user, cartId, getCurrentSession }}>
      {children}
    </ApiContext.Provider>
  );
}
