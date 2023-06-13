function Aside({ options, handleOptionClick, selectedOption }) {
  return (
    <aside className="aside">
      <ul>
        {options.map((op) => {
          return (
            <li
              className={op === selectedOption ? "option selected" : "option"}
              key={op}
              onClick={() => handleOptionClick(op)}
            >
              {op}
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
export default Aside;
