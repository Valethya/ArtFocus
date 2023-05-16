import { useContext } from "react";
import { ApiContext } from "../../context/ApiContext";

function Pagination() {
  const { setUrlPage, page } = useContext(ApiContext);
  console.log(page);
  function handlePage(pages) {
    console.log(pages);
    setUrlPage(pages);
  }
  console.log(page, "donde estaaaaa?");
  return (
    <div className="pagination">
      <ul class="pagination">
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
