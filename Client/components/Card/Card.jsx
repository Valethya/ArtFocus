import React from "react";
import { useEffect, useState } from "react";
import Button from "../Button/Button";

export default function Card() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:8080/api/products");
        const data = await response.json();
        setData(data.payload);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  return data.map((prod) => {
    return (
      <div className="card ">
        <div className="contentCard">
          <div className="contentImg">
            <img src={prod.thumbnail}></img>
          </div>

          <div>
            <div className="cardTitle">
              <h4>{prod.title}</h4>
            </div>
            <span>$ {prod.price}</span>

            <Button>Agregar</Button>
          </div>
        </div>
      </div>
    );
  });
}
