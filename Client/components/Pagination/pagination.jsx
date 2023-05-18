import { useContext } from "react";
import { ApiContext } from "../../context/ApiContext";

function Pagination({ handle, page }) {
  function handlePage(pages) {
    handle(pages);
  }

  return (
    <div className="pagination">
      <ul className="pagination">
        <li className="page" onClick={() => handlePage(page.prevLink)}>
          {" << antes"}
        </li>
        <li className="page">{page.page}</li>
        <li className="page" onClick={() => handlePage(page.nextLink)}>
          {"siguiente>>"}
        </li>
      </ul>
    </div>
  );
}
export default Pagination;
