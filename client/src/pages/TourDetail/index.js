// main
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

// components
import ContactTable from "./ContactTable";
import TourInfo from "./TourInfo";
import TourCarousel from "./TourCarousel";
import ErrorPage from "../../components/ErrorPage";
import ErrorBoundary from "../../components/ErrorBoundary";
import Placeholder from "../../components/placeholders/Placeholder";
import FacebookComment from "../../components/facebooks/FacebookComment";
import FacebookLikeButton from "../../components/facebooks/FacebookLikeButton";
import Banner from "../../components/Banner";

// apis
import useAxios from "../../hooks/useAxios";
import { fetchSingleTour } from "../../services/apis";

// other
import usePageTitle from "../../hooks/usePageTitle";

//  css
import styles from "./TourDetail.module.css";
import { selectTourBySlug } from "../../store/tours.slice";
import setMetaTags from "./setMetaTags";

function TourDetail() {
  const [hasMeta, setHasMeta] = useState("");
  const [sendRequest, isLoading, tour, error] = useAxios((data) => data.data);
  const { t } = useTranslation();
  const lang = useTranslation().i18n.language;

  const { slug } = useParams();
  const clientSideTour = useSelector(selectTourBySlug(slug));
  if (clientSideTour && !hasMeta) {
    setMetaTags(clientSideTour);
    setHasMeta(true);
  }

  useEffect(() => {
    return () => {
      setHasMeta(false);
    };
  }, [slug]);

  const pageTitle = tour?.name || "";

  usePageTitle(pageTitle);

  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
    });
  }, [slug]);

  // handle slider data
  // handle data
  let slider = [];
  if (tour) {
    slider = tour.itinerary.reduce((acc, cur) => [...acc, ...cur.images], []);
  }

  useEffect(() => {
    sendRequest(fetchSingleTour(slug));
  }, [slug]);


  if (error) {
    return <ErrorPage code={error.httpCode} message={error.message} />;
  }

  // content
  // title
  let tourTitle;
  if (tour && !isLoading) {
    const tourName = (
      <span className="text-uppercase">
        {tour.name} [{tour.code}]
      </span>
    );

    let viewsCount = null;
    if (tour.views_count && tour.views_count > 0)
      viewsCount = (
        <i className="text-secondary fs-5 fw-normal">
          ({tour.views_count} {t("general.views")})
        </i>
      );

    viewsCount = null;
    tourTitle = (
      <>
        {tourName} {viewsCount}
      </>
    );
  }

  if (isLoading) tourTitle = <Placeholder height={30} width={"60%"} />;

  // facebook like share buttons
  let likeShareButtons;
  if (tour && !isLoading)
    likeShareButtons = (
      <FacebookLikeButton
        href={`${window.location.origin}${
          lang !== "vi" ? `/${lang}` : ""
        }/du-lich/${slug}`}
      />
    );

  if (isLoading)
    likeShareButtons = (
      <div className="mt-4">
        <Placeholder col={8} height={26} rounded />
      </div>
    );

  // facebook comment
  let facebookComment;
  if (tour && !isLoading)
    facebookComment = (
      <FacebookComment
        width="100%"
        href={`${window.location.origin}/du-lich/${slug}`}
      />
    );

  if (isLoading)
    facebookComment = (
      <div className="mt-4">
        <Placeholder col={12} height={80} rounded />
      </div>
    );
  return (
    <>
      <Banner />
      <div className={styles.tourDetail + " container-lg"}>
        {!error && (
          <div className="p-2">
            <div className="row ">
              <div className="col-12">
                <h1 className="my-4 fs-4 fw-bold">{tourTitle}</h1>
              </div>

              <div className="col-12 col-lg-8 mb-4 ">
                <ErrorBoundary>
                  <TourCarousel slider={slider} isLoading={isLoading} />
                </ErrorBoundary>

                {likeShareButtons}

                <div className="pt-3">
                  <ErrorBoundary>
                    <TourInfo tour={tour} isLoading={isLoading} />
                  </ErrorBoundary>
                </div>
              </div>

              <div className="col-12 col-lg-4 mb-4">
                <ErrorBoundary>
                  <ContactTable tour={tour} isLoading={isLoading} />
                </ErrorBoundary>
              </div>
            </div>

            <div className="pb-5 pt-5">{tour && facebookComment}</div>
          </div>
        )}
      </div>
    </>
  );
}

export default TourDetail;
