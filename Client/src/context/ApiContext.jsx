import React, { createContext, useContext, useState } from "react";
export const ApiContext = createContext();
export function ApiContextProvider({ children }) {
  const [user, setUser] = useState("");
  const [cartId, setCartId] = useState("");

  //fecth de prodcutos
  async function fetchProducts(url) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchPost(url) {
    try {
      const response = await fetch(url, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataForm),
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <ApiContext.Provider
      value={{
        user,
        cartId,
        fetchProducts,
        fetchPost,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
}
