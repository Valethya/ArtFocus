import React, { createContext, useContext, useState } from "react";
export const ApiContext = createContext();
export function ApiContextProvider({ children }) {
  const [user, setUser] = useState("");
  // const [email, setEmail] = useState("");
  // const [name, setName] = useState("");

  async function getCurrentSession() {
    try {
      const response = await fetch("http://localhost:8080/session/current", {
        credentials: "include",
      });

      if (!response) {
        throw new Error("response not OK");
      }
      const data = await response.json();

      setUser(data.data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <ApiContext.Provider value={{ user, getCurrentSession }}>
      {children}
    </ApiContext.Provider>
  );
}
