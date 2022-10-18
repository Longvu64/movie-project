import { RiArrowRightSLine, RiArrowLeftSLine } from "react-icons/ri";
import { useEffect, useState, useContext, Fragment } from "react";

import styles from "./Pagination.module.scss";
import className from "classnames/bind";
import { Link, useParams } from "react-router-dom";
import { MovieIdContext } from "../../App";
import PageLink from "../PageLink/PageLink";

const cx = className.bind(styles);
const pageNumber = [1, 2, 3, 4, 5, 6];

function Pagination({ getPage, genreId, page }) {
  const context = useContext(MovieIdContext);
  let [index, setIndex] = useState(1);
  const getIndex = (ind) => {
    setIndex(ind);
  };
  
  index = useParams().pageURL;
  
  if (index < 1) {
    setIndex(1);
  }
  if (index > 500) {
    setIndex(500);
  }
  useEffect(() => {
    setIndex(1);
    getPage(1);
  }, [genreId]);
  if(page>500){
    getPage(500)
  }
  if(page<1){
    getPage(1)
  }
  return (
    <Fragment>
      {index < 4 && index >= 0 && (
        <div className={cx("pagination")}>
          <Link to={page > 1 ? `/type=${context.type}/genre=${context.genreId}/page=${Number(page) - 1 }`: undefined}>
            <RiArrowLeftSLine
              onClick={() => {
                setIndex(Number(index) - 1);
                getPage(index - 1);
              }}
              className={cx("arrow")}
            />
          </Link>
          {pageNumber.map((pages, id) => {
            return (
              <PageLink page={pages}
                key={id}
                getIndex={getIndex}
                onClick={(() => {context.getPage(pages)})}
              >
                {pages}
              </PageLink>
            );
          })}
          <Link to={`/type=${context.type}/genre=${context.genreId}/page=${Number(page) + 1}`}>
            <RiArrowRightSLine
              onClick={() => {
                setIndex(Number(index) + 1);
                getPage(Number(index) + 1);
              }}
              className={cx("arrow")}
            />
          </Link>
        </div>
      )}
      {index > 3 && index < 498 && (
        <div className={cx("pagination")}>
          <Link to={`/type=${context.type}/genre=${context.genreId}/page=${Number(page) - 1}`}>
            <RiArrowLeftSLine
              onClick={() => {
                setIndex(index - 1);
                getPage(index - 1);
              }}
              className={cx("arrow")}
            />
          </Link>
          <PageLink className={cx("page-number")} getIndex={getIndex}>
            1
          </PageLink>
          <p className={cx("page-number")}>...</p>
          <PageLink className={cx("page-number")} getIndex={getIndex}>
            {index - 1}
          </PageLink>
          <PageLink className={cx("page-number")} getIndex={getIndex}>
            {index}
          </PageLink>
          <PageLink className={cx("page-number")} getIndex={getIndex}>
            {Number(index) + 1}
          </PageLink>
          <p className={cx("page-number")}>...</p>
          <PageLink className={cx("page-number")} getIndex={getIndex}>
            500
          </PageLink>
          <Link to={`/type=${context.type}/genre=${context.genreId}/page=${Number(page) + 1}`}>
            <RiArrowRightSLine
              onClick={() => {
                setIndex(index + 1);
                getPage(index + 1);
              }}
              className={cx("arrow")}
            />
          </Link>
        </div>
      )}
      {index >= 498 && index <= 500 && (
        <div className={cx("pagination")}>
          <Link to={`/type=${context.type}/genre=${context.genreId}/page=${Number(page) - 1}`}>
            <RiArrowLeftSLine
              onClick={() => {
                setIndex(index - 1);
                getPage(index - 1);
              }}
              className={cx("arrow")}
            />
          </Link>
          <PageLink className={cx("page-number")} getIndex={getIndex}>
            1
          </PageLink>
          <p className={cx("page-number")}>...</p>
          <PageLink className={cx("page-number")} getIndex={getIndex}>
            497
          </PageLink>
          <PageLink className={cx("page-number")} getIndex={getIndex}>
            498
          </PageLink>
          <PageLink className={cx("page-number")} getIndex={getIndex}>
            499
          </PageLink>
          <PageLink className={cx("page-number")} getIndex={getIndex}>
            500
          </PageLink>
          <Link to={page < 500 ? `/type=${context.type}/genre=${context.genreId}/page=${Number(page) + 1}` : undefined}>
            <RiArrowRightSLine
              onClick={() => {
                setIndex(index + 1);
                getPage(index + 1);
              }}
              className={cx("arrow")}
            />
          </Link>
        </div>
      )}
    </Fragment>
  );
}

export default Pagination;
