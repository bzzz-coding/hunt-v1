import { useAllJobsContext } from "../pages/AllJobs";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import Wrapper from "../assets/wrappers/PageBtnContainer";
import { useLocation, Link, useNavigate } from "react-router-dom";

const PageBtnContainer = () => {
  const {
    data: { totalPages, currentPage },
  } = useAllJobsContext();
  // console.log(totalPages, currentPage);

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  // console.log(pages);

  const { search, pathname } = useLocation();
  // console.log(search, pathname);

  const navigate = useNavigate();

  const handlePageChange = (page) => {
    const searchParams = new URLSearchParams(search);
    console.log(searchParams);
    searchParams.set("page", page);
    navigate(`${pathname}?${searchParams}`);
  };

  const addPageBtn = ({ pageNum, isActive }) => {
    return (
      <button
        onClick={() => handlePageChange(pageNum)}
        key={pageNum}
        className={`btn page-btn ${isActive && "active"}`}
      >
        {pageNum}
      </button>
    );
  };

  const generateListOfPageButtons = () => {
    let listOfPageButtons = [];
    listOfPageButtons.push(
      addPageBtn({ pageNum: 1, isActive: currentPage === 1 })
    );

    if (currentPage > 3) {
      listOfPageButtons.push(
        <span className="page-btn dots" key="dots-1">
          ...
        </span>
      );
    }

    if (currentPage > 2) {
      listOfPageButtons.push(
        addPageBtn({ pageNum: currentPage - 1, isActive: false })
      );
    }

    if (currentPage !== 1 && currentPage !== totalPages) {
      listOfPageButtons.push(
        addPageBtn({ pageNum: currentPage, isActive: true })
      );
    }

    if (currentPage < totalPages - 1) {
      listOfPageButtons.push(
        addPageBtn({ pageNum: currentPage + 1, isActive: false })
      );
    }

    if (currentPage < totalPages - 1) {
      listOfPageButtons.push(
        <span className="page-btn dots" key="dots-2">
          ...
        </span>
      );
    }

    if (totalPages > 1) {
      listOfPageButtons.push(
        addPageBtn({
          pageNum: totalPages,
          isActive: currentPage === totalPages,
        })
      );
    }

    return listOfPageButtons;
  };

  return (
    <Wrapper>
      {currentPage > 1 && (
        <button
          onClick={() => {
            const prevPage = currentPage - 1;
            handlePageChange(prevPage);
          }}
          className="btn prev-btn"
        >
          <HiChevronDoubleLeft />
          prev
        </button>
      )}
      <div className="btn-container">
        {/* {pages.map((pageNum) => <button onClick={() => handlePageChange(pageNum)} key={pageNum} className={`btn page-btn ${pageNum === currentPage && 'active'}`}>{pageNum}</button>)} */}
        {generateListOfPageButtons()}
      </div>
      {currentPage < totalPages && (
        <button
          onClick={() => {
            let nextPage = currentPage + 1;
            handlePageChange(nextPage);
          }}
          className="btn next-btn"
        >
          next
          <HiChevronDoubleRight />
        </button>
      )}
    </Wrapper>
  );
};
export default PageBtnContainer;
