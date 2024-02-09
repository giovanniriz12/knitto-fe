import { IPaginationComponent } from "@/app/_interfaces/requests/IPagination";
import { useAppSelector } from "@/app/_redux/store";
import { FC, Fragment, memo } from "react";

const Pagination: FC<IPaginationComponent> = (props) => {
  const page = useAppSelector((state) => state.todos.page);

  return (
    <Fragment>
      <div className="col-md-12 d-flex justify-content-center">
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
              <a
                className="page-link"
                href="#"
                onClick={() => props.onClickPrevOrNextPage("&laquo;")}
              >
                &laquo;
              </a>
            </li>
            <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
              <a
                className="page-link"
                href="#"
                onClick={() => props.onClickPrevOrNextPage("&lsaquo;")}
              >
                &lsaquo;
              </a>
            </li>

            {props.paginationData.map((value) => (
              <li
                className={`page-item ${value === page ? "active" : ""}`}
                onClick={() => props.onClickPrevOrNextPage(value)}
                key={value}
              >
                <a className="page-link" href="#">
                  {value}
                </a>
              </li>
            ))}

            <li
              className={`page-item ${
                page === props.totalPage ? "disabled" : ""
              }`}
            >
              <a
                className="page-link"
                href="#"
                onClick={() => props.onClickPrevOrNextPage("&rsaquo;")}
              >
                &rsaquo;
              </a>
            </li>
            <li
              className={`page-item ${
                page === props.totalPage ? "disabled" : ""
              }`}
            >
              <a
                className="page-link"
                href="#"
                onClick={() => props.onClickPrevOrNextPage("&raquo;")}
              >
                &raquo;
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </Fragment>
  );
};

export default memo(Pagination);
