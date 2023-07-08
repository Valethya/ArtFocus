import { useSelector } from "react-redux";

function Counter() {
  const count = useSelector((state) => state.Counter);
  return (
    count > 0 && (
      <span span className="counter">
        {" "}
        {count}
      </span>
    )
  );
}
export default Counter;
