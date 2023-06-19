import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import Modal from "react-bootstrap/Modal";
import { xMark as closeSVG } from "../../../assets/svgs";
import Slider from "react-slick";
import {
  SlickArrowLeft,
  SlickArrowRight,
} from "../../../components/slickArrows";
import LazyImg from "../../../components/LazyImg";
import Placeholder from "../../../components/placeholders/Placeholder";
import { imageDimensions } from "../../../services/constants";
import styles from "./TourCarousel.module.css";
import "./TourCarousel.override.css";

function TourCarousel({ slider, isLoading, size = "md" }) {
  const [index, setIndex] = useState(0);
  const [isShowModal, setIsShowModal] = useState(false);

  // carousel setting
  const settings = {
    className: "center",
    centerMode: true,
    slidesToShow: 1,
    speed: 500,
    centerPadding: size === "sm" ? "35px" : "50px",
    prevArrow: <SlickArrowLeft />,
    nextArrow: <SlickArrowRight slidesToShow={1} slidesToScroll={1} />,
  };

  // handler functions
  const handleSelect = (selectedIndex) => {
    if (selectedIndex === -1) {
      setIndex(slider.length - 1);
    } else if (selectedIndex === slider.length) {
      setIndex(0);
    } else {
      setIndex(selectedIndex);
    }
  };

  const closeModalHandler = () => {
    setIsShowModal(false);
  };

  // handle class
  let classes = styles.container + " tourCarousel__container ";
  if (size === "sm") {
    classes += "sm";
  }

  const hasSlider = slider.length > 0;

  return (
    <>
      <div className={classes}>
        {hasSlider && !isLoading && (
          <Slider
            {...settings}
            afterChange={(x) => {
              setIndex(x);
            }}
          >
            {!isLoading &&
              hasSlider &&
              slider.map((item) => (
                <div key={item.url} className={styles.image}>
                  <div className="bg-secondary text-light">
                    <LazyImg
                      onClick={() => setIsShowModal(true)}
                      src={`${item.url}?${
                        size === "sm" ? imageDimensions.sm : imageDimensions.md
                      }`}
                      alt={item.caption}
                    />
                    <p className={styles.imageCaption}>{item.caption}</p>
                  </div>
                </div>
              ))}
          </Slider>
        )}

        {isLoading && (
          <Slider
            {...settings}
            afterChange={(x) => {
              setIndex(x);
            }}
          >
            {new Array(3).fill(1).map((_, index) => (
              <div
                key={index}
                className={styles.image}
                onClick={() => setIsShowModal(true)}
              >
                <Placeholder width="100%" height="100%" />
              </div>
            ))}
          </Slider>
        )}
      </div>

      {isShowModal && (
        <button className={styles.closeModalBtn} onClick={closeModalHandler}>
          {closeSVG}
        </button>
      )}
      <Modal
        show={isShowModal}
        onHide={closeModalHandler}
        animation={false}
        className={styles.modal + " modal-dialog-override"}
        contentClassName={styles.modalContent}
        centered
        dialogClassName="modal-90w"
        backdropClassName={styles.modalBackdrop}
        size="xl"
      >
        <div className={styles.modalInner}>
          <Carousel
            activeIndex={index}
            onSelect={handleSelect}
            indicators={false}
          >
            {!isLoading &&
              hasSlider &&
              slider.map((item) => (
                <Carousel.Item
                  key={item.url}
                  className={styles.carouselItemModal}
                >
                  <div className={styles.imageModal}>
                    <LazyImg
                      src={`${item.url}?${imageDimensions.md}`}
                      alt={item.caption}
                    />
                    <p className={styles.imageCaption}>{item.caption}</p>
                  </div>
                </Carousel.Item>
              ))}
          </Carousel>
        </div>
      </Modal>
    </>
  );
}

export default TourCarousel;
