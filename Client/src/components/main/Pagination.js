import "./Pagination.css";
import ArrowLeft from "../icons/ArrowLeft";
import ArrowRight from "../icons/ArrowRight";
import ReactPaginate from "react-paginate";

export default function Pagination({
    totalPageCount,
    pageLimit,
    currPage,
    setCurrPage
}) {
    return (
        <ReactPaginate
            containerClassName="pagination center"
            pageClassName="page"
            activeClassName="page page-current"
            breakClassName="page page-ellipsis"
            previousClassName="page page-previous"
            nextClassName="page page-next"
            disabledClassName="page page-disabled"
            previousLabel={<ArrowLeft />}
            nextLabel={<ArrowRight />}
            pageCount={Math.ceil(totalPageCount / pageLimit)}
            pageRangeDisplayed={2}
            marginPagesDisplayed={1}
            forcePage={currPage - 1}
            onPageChange={e => setCurrPage(Number(e.selected + 1))}
        />
    );
}
