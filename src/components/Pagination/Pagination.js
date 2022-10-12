import { RiArrowRightSLine, RiArrowLeftSLine } from "react-icons/ri";
import { useEffect, useState, useContext, Fragment } from "react";

import styles from "./Pagination.module.scss";
import className from "classnames/bind";
import { useParams } from "react-router-dom";
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
  return (
    <Fragment>
      {index < 4 && index >= 0 && (
        <div className={cx("pagination")}>
          <RiArrowLeftSLine
            onClick={() => {
              setIndex(index - 1);
              getPage(index - 1);
            }}
            className={cx("arrow")}
          />
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
          <RiArrowRightSLine
            onClick={() => {
              setIndex(index + 1);
              getPage(index + 1);
            }}
            className={cx("arrow")}
          />
        </div>
      )}
      {index > 3 && index < 498 && (
        <div className={cx("pagination")}>
          <RiArrowLeftSLine
            onClick={() => {
              setIndex(index - 1);
              getPage(index - 1);
            }}
            className={cx("arrow")}
          />
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
          <RiArrowRightSLine
            onClick={() => {
              setIndex(index + 1);
              getPage(index + 1);
            }}
            className={cx("arrow")}
          />
        </div>
      )}
      {index >= 498 && index <= 500 && (
        <div className={cx("pagination")}>
          <RiArrowLeftSLine
            onClick={() => {
              setIndex(index - 1);
              getPage(index - 1);
            }}
            className={cx("arrow")}
          />
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
          <RiArrowRightSLine
            onClick={() => {
              setIndex(index + 1);
              getPage(index + 1);
            }}
            className={cx("arrow")}
          />
        </div>
      )}
    </Fragment>
  );
}

export default Pagination;
