import { useEffect, useState, useRef } from "react";
import "./pagination.css";
import { chevronLeft, chevronRight } from "../../assets/svgs";
import Overlay from "react-bootstrap/Overlay";
import Popover from "react-bootstrap/Popover";
import { useTranslation } from "react-i18next";
import PaginationInput from "./PaginationInput";

export default function CustomPagination({ total, pagenumber, callback }) {
  const [page, setPage] = useState(pagenumber);
  const [pageInput, setPageInput] = useState(pagenumber);
  const [show, setShow] = useState(false);
  const { t } = useTranslation();

  const ref = useRef(null);
  const pageNumberRef = useRef();

  const handleClick = () => {
    setShow((prev) => !prev);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (Number(pageInput) > total || Number(pageInput) < 1) return;
    setPage(Number(pageInput));
    setShow(false);
  };

  const changeHandler = (e) => {
    const val = e.target.value;
    const valNum = Number(val);

    if (isNaN(valNum)) {
      return;
    }

    if (!Number.isInteger(valNum)) {
      return;
    }

    setPageInput(val);
  };

  // buttons classes
  let leftClasses = "";
  if (pagenumber == 1) {
    leftClasses += " color__button__disable";
  }

  let rightClasses = "";
  if (pagenumber == total) {
    rightClasses += " color__button__disable";
  }

  const goBackHandler = () => {
    if (pagenumber > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const goNextHandler = () => {
    if (pagenumber < total) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    if (page !== pagenumber) {
      callback(page);
    }
  }, [page]);

  useEffect(() => {
    setPage(pagenumber);
  }, [pagenumber]);

  return (
    <div className="container__pagination" ref={ref}>
      <Overlay
        show={show}
        target={pageNumberRef.current}
        placement="top"
        container={ref}
        containerPadding={20}
        onExited={() => setPageInput(page)}
        rootClose={true}
        onHide={() => setShow(false)}
      >
        <Popover id="popover-contained">
          {show && (
            <Popover.Body>
              <form onSubmit={submitHandler}>
                <PaginationInput
                  type="text"
                  value={pageInput}
                  onChange={changeHandler}
                />
                <button type="submit">{t("components.pagination.go")}</button>
              </form>
            </Popover.Body>
          )}
        </Popover>
      </Overlay>

      <button
        ref={pageNumberRef}
        className="button__number"
        onClick={handleClick}
      >
        {pagenumber}
      </button>
      <span>{"  of " + total + " "}</span>
      <button
        id="chevronLeft"
        className={leftClasses}
        type="button"
        onClick={goBackHandler}
      >
        {chevronRight}
      </button>
      <button
        id="chevronRight"
        className={rightClasses}
        type="button"
        onClick={goNextHandler}
      >
        {chevronLeft}
      </button>
    </div>
  );
}
