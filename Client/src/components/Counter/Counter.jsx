import { useSelector } from "react-redux";

function Counter() {
  const count = useSelector((state) => state.counter);
  return <span className="counter">{count}</span>;
}
export default Counter;
