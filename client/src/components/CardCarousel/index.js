import { useMemo } from "react";
import { SlickArrowLeft, SlickArrowRight } from "../../components/slickArrows";
import Slider from "react-slick";
import styles from "./CardCarousel.module.css";
import "./CardCarousel.override.css";

function CardCarousel({ cards }) {
  const settings = useMemo(
    () => ({
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 2,
      initialSlide: 0,
      useTransform: false,
      nextArrow: <SlickArrowRight slidesToScroll={2} slidesToShow={4} />,
      prevArrow: <SlickArrowLeft />,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: false,
            dots: false,
            nextArrow: <SlickArrowRight slidesToScroll={3} slidesToShow={3} />,
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            infinite: false,
            dots: false,
            nextArrow: <SlickArrowRight slidesToScroll={2} slidesToShow={2} />,
          },
        },
        {
          breakpoint: 400,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            initialSlide: 0,
            nextArrow: <SlickArrowRight slidesToScroll={1} slidesToShow={1} />,
          },
        },
      ],
    }),
    []
  );
  return (
    <div className={styles.container + " cardCarousel"}>
      {cards && (
        <Slider {...settings}>
          {cards.map(({ card, id }) => (
            <div className={styles.carouselItem} key={id}>
              {card}
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
}

export default CardCarousel;
