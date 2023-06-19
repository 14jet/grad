import { chevronLeft, chevronRight } from "../../assets/svgs";

export const SlickArrowLeft = ({
  currentSlide,
  slideCount,
  infinite,
  ...props
}) => (
  <button
    {...props}
    className={
      "slick-prev slick-arrow" +
      (currentSlide === 0 && !infinite ? " slick-disabled" : "")
    }
    aria-hidden="true"
    aria-disabled={currentSlide === 0 && !infinite ? true : false}
    type="button"
  >
    {chevronRight}
  </button>
);

export const SlickArrowRight = ({
  slideCount,
  currentSlide,
  slidesToShow,
  slidesToScroll,
  infinite,
  ...props
}) => {
  const disabled = currentSlide + slidesToShow - slideCount === 0 && !infinite;

  return (
    <button
      {...props}
      className={"slick-next slick-arrow" + (disabled ? " slick-disabled" : "")}
      aria-hidden="true"
      aria-disabled={
        slideCount <= slidesToShow + currentSlide * slidesToScroll && !infinite
          ? true
          : false
      }
      type="button"
    >
      {chevronLeft}
    </button>
  );
};
