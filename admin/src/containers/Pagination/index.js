import { useEffect, useState, useRef } from "react";
import { chevronLeft, chevronRight } from "../../assets/svgs";
import Overlay from "react-bootstrap/Overlay";
import Popover from "react-bootstrap/Popover";
import "./Pagination.css";

export default function Pagination({ totalPage, currentPage, callback }) {
  const [pageInput, setPageInput] = useState(totalPage);
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);

  const ref = useRef(null);


  const handleClick = (event) => {
    setShow(!show);
    setTarget(event.target);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (pageInput > totalPage || pageInput < 1) return;
    setShow(false);
    callback(pageInput)
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

    setPageInput(valNum);
  };

  // buttons classes
  let leftClasses = "";
  if (currentPage == 1) {
    leftClasses += " color__button__disable";
  }

  let rightClasses = "";
  if (currentPage == totalPage) {
    rightClasses += " color__button__disable";
  }

  const goBack = () => {
    if (currentPage > 1) {
      callback(currentPage - 1)
    }
  }

  const goNext = () => {
    if (currentPage < totalPage) {
      console.log('go000',currentPage + 1)
      callback(currentPage + 1)
    }
  }

  const onExitPopper = () => {
    setPageInput(totalPage)
  }

  const onHidePopper = () => {
    setShow(false)
  }

  return (
    <div className="container__pagination" ref={ref}>
      <Overlay
        show={show}
        target={target}
        placement="top"
        container={ref}
        containerPadding={20}
        onExited={onExitPopper}
        rootClose={true}
        onHide={onHidePopper}
      >
        <Popover id="popover-contained">
          <Popover.Body>
            <form onSubmit={submitHandler}>
              <input
                type="text"
                placeholder="nhập số trang"
                value={pageInput}
                onChange={changeHandler}
              />
              <button type="submit">Đi tới</button>
            </form>
          </Popover.Body>
        </Popover>
      </Overlay>

      <button className="button__number" onClick={handleClick}>
        {currentPage}
      </button>
      <span>{"  of " + totalPage + " "}</span>
      <span>
        <button
          id="chevronLeft"
          type="button"
          className={leftClasses}
          onClick={goBack}
        >
          {chevronRight}
        </button>
        <button
          id="chevronRight"
          type="button"
          className={rightClasses}
          onClick={goNext}
        >
          {chevronLeft}
        </button>
      </span>
    </div>
  );
}
