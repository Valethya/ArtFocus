import { Link } from "react-router-dom";

function Aside({ options, handleOptionClick }) {
  return (
    <aside className="aside">
      <ul>
        {options.map((op) => {
          return (
            <li key={op} onClick={() => handleOptionClick(op)}>
              {op}
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
export default Aside;
