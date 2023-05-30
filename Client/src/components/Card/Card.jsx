import React, { useContext } from "react";
import Button from "../Button/Button";
import { ApiContext } from "../../context/ApiContext";
import { useDispatch, useSelector } from "react-redux";
import { increment } from "../../store/slice/conuterSlice";
import apiRequest from "../../services/api";

export default function Card({ products }) {
  // const [data, setData] = useState([]);
  // const [prodId, setProdId] = useState([]);
  const cartId = useSelector((state) => state.user.cartId);
  const dispatch = useDispatch();

  function handleAdd(prod) {
    try {
      const endPoint = `/api/carts/${cartId}/product/${prod}`;
      apiRequest(endPoint, "POST");
      dispatch(increment());
    } catch (error) {
      console.log(error);
    }
  }
  return products.map((prod) => {
    return (
      <div className="card" key={prod.id}>
        <div className="contentCard">
          <div className="contentImg">
            <img src={prod.thumbnail}></img>
          </div>

          <div>
            <div className="cardTitle">
              <h4>{prod.title}</h4>
            </div>
            <span>$ {prod.price}</span>

            <Button
              handle={() => {
                handleAdd(prod.id);
              }}
            >
              Agregar
            </Button>
          </div>
        </div>
      </div>
    );
  });
}
