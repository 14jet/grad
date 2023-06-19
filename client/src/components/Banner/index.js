import { memo, useMemo } from "react";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import { useTranslation } from "react-i18next";
import BannerSliderItem from "./BannerSliderItem";
import { SlickArrowLeft, SlickArrowRight } from "../slickArrows";
import "./Banner.override.css";
import FadedAnimation from "../FadedAnimation";
import styles from './Banner.module.css'

const settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 2500,
    prevArrow: <SlickArrowLeft infinite />,
    nextArrow: <SlickArrowRight slidesToShow={1} slidesToScroll={1} infinite />,
  };

const BannerError = ({ msg }) => (
  <div className="d-flex align-items-center justify-content-center bg-secondary h-100">
    <div>
      <p className="text-center text-light">Error: {msg}</p>
    </div>
  </div>
);

const BannerPending = () => (
  <div className="d-flex align-items-center justify-content-center bg-secondary h-100"></div>
);

function Banner() {
  const { vnTours, euTours, status, error } = useSelector(
    (state) => state.tours
  );
  const { t } = useTranslation();

  const isLoading = status === "idle" || status === "pending"

  let carouselItems = useMemo(() => {
    return [...vnTours.slice(0, 3), ...euTours.slice(0, 3)];
  }, [status]);

//   loading 
  let content = <BannerPending />;

//   error
  if (error) {
    content = <BannerError msg={error.message} />;
  }

//   has tours 
  if (!error && !isLoading && carouselItems.length > 0) {
    content = (
      <Slider {...settings}>
        {carouselItems.map((item) => (
          <BannerSliderItem
            key={item._id}
            to={`/du-lich/${item.slug}`}
            image={item.thumb}
            alt={item.name || item.title}
          />
        ))}
      </Slider>
    );
  }

    //   no tours 
  if (!error && !isLoading && carouselItems.length === 0) {
    content = (
      <p className="text-light text-center mt-5 pt-5">{t("general.noTours")}</p>
    );
  }



  return (
    <FadedAnimation>
      <div className="bannerCarousel">
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <div className={styles.banner}>{content}</div>
            </div>
        </div>
      </div>
    </FadedAnimation>
  );
}

export default memo(Banner);
