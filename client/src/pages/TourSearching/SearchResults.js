import { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
// import { selectToursStatistic } from "../../store/tours.slice";
import useSearchTour from "../../hooks/useSearchTour";
import LLink from "../../components/LLink";
import styles from "./TourSearching.module.css";
import { useParams } from "react-router-dom";

function SearchResults({ inputRef, onHide, searchTerm }) {
  const lang = useTranslation().i18n.language;
  const { t } = useTranslation();
  let { place, placeOrPage } = useParams();
  if (isNaN(Number(placeOrPage))) {
    place = placeOrPage;
  }
  const containerRef = useRef();
  const statistic = useSelector((state) => state.tours.catalog);
  const results = useSearchTour(searchTerm);
  const hasText = searchTerm.trim();
  useEffect(() => {
    const handler = (e) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(e.target) &&
        containerRef.current &&
        !containerRef.current.contains(e.target)
      ) {
        onHide();
      }
    };

    window.addEventListener("mousedown", handler);

    return () => window.removeEventListener("mousedown", handler);
  }, []);
  return (
    <div
      className={styles.searchResults + " tours border-bottom p-3"}
      ref={containerRef}
    >
      {hasText && results.length > 0 && (
        <div>
          <LLink
            to={`/du-lich/tim-kiem/${place || ""}?search=${searchTerm}`}
            onClick={onHide}
          >
            <p className="text-secondary mb-2 text-underline">
              <u>
                {lang === "en" ? "See all" : "Xem tất cả"} {results.length}{" "}
                {lang === "en"
                  ? "result" + `${results.length > 1 ? "s" : ""}`
                  : "kết quả"}
              </u>
            </p>
          </LLink>
          <ul className="list-group">
            {results.map((tour) => (
              <li key={tour.code} className="mb-2 ">
                <LLink
                  to={`/du-lich/${tour.slug}`}
                  onClick={onHide}
                  className={styles.resultItem}
                  title={tour.name}
                >
                  <div className={styles.image}>
                    <img src={tour.thumb} alt={tour.name} />
                  </div>

                  <div className={styles.textBox}>
                    <p className="text-dark m-0">
                      <strong>{tour.name}</strong>
                    </p>
                    <p className="text-secondary m-0">
                      {tour.days} days, {tour.nights} nights
                    </p>
                    <p>{tour.price.toLocaleString()} vnđ</p>
                  </div>
                </LLink>
              </li>
            ))}
          </ul>
        </div>
      )}

      {hasText && results.length === 0 && (
        <p className="m-0">{t("search.tour.notMatch")}</p>
      )}

      {!hasText && (
        <div className={styles.catalogue}>
          <div className="border-bottom">
            <h6>
              <strong>
                {lang === "en" ? "Europe Travel" : "Du lịch châu Âu"}
              </strong>{" "}
              <span className="fw-normal">
                ({statistic.eu.totalCount} tours)
              </span>
            </h6>

            <ul className="row">
              {statistic.eu.countByPlace.map((country) => (
                <li key={country.place.slug} className="col-4 mb-1">
                  <LLink
                    to={`/du-lich/tim-kiem/${country.place.slug}`}
                    className="text-dark"
                    onClick={onHide}
                  >
                    <strong>{country.place.name}</strong> ({country.toursCount}{" "}
                    {country.toursCount > 1 ? "tours" : "tour"})
                  </LLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-3">
            <h6>
              <strong>
                {lang === "en" ? "Domestic Travel" : "Du lịch trong nước"}
              </strong>{" "}
              <span className="fw-normal">
                ({statistic.vn.totalCount} tours)
              </span>
            </h6>
            <ul className="row">
              {statistic.vn.countByPlace.map((province) => (
                <li key={province.place.slug} className="col-4 mb-1">
                  <LLink
                    to={`/du-lich/tim-kiem/${province.place.slug}`}
                    className="text-dark"
                    onClick={onHide}
                  >
                    <strong>{province.place.name}</strong> (
                    {province.toursCount}{" "}
                    {province.toursCount > 1 ? "tours" : "tour"})
                  </LLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchResults;
