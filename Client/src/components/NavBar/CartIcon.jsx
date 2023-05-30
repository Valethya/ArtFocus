import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Icon } from "@mui/material";
import Counter from "../Counter/Counter";

function CartIcon() {
  const count = useSelector((state) => state.counter);
  return (
    <Link className="cartIcon" to={"/Cart"}>
      <Icon className="iconCart">shopping_cart</Icon>
      {count == 0 ? "" : <Counter />}
    </Link>
  );
}
export default CartIcon;
