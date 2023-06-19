import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import useSearchTour from "../../../../hooks/useSearchTour";
// import { selectToursStatistic } from "../../../../store/tours.slice";
import SearchItem from "./SearchItem";
import LLink from "../../../../components/LLink";
import styles from "./SearchResults.module.css";

function SearchResults({ inputRef, onHide, searchTerm }) {
  const { t, i18n } = useTranslation();
  const containerRef = useRef();

  const {
    status,
    error,
    catalog: statistic,
  } = useSelector((state) => state.tours);

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

  // *********** HANDLE SEARCH ************
  const results = useSearchTour(searchTerm);
  const hasText = searchTerm.trim();

  // content
  let content;
  const isLoading = status === "pending" || status === "idle";

  if (isLoading) {
    content = (
      <div className="d-flex justify-content-center">
        <div className="spinner-border spinner-border-sm" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    const message = error.httpCode
      ? error.httpCode + " - " + error.message
      : error.message;

    content = <p className="m-0">{message}</p>;
  }

  if (!error && hasText && results.length === 0 && !isLoading) {
    content = <p className="m-0">{t("search.tour.notMatch")}</p>;
  }

  if (!error && hasText && results.length > 0 && !isLoading) {
    content = (
      <div>
        <LLink
          className="text-secondary pb-1 d-block"
          to={`/du-lich/tim-kiem/?search=${searchTerm}`}
        >
          <u>
            <i>
              {results.length === 1 &&
                `${t("search.tour.seeAll")} ${results.length} ${t(
                  "search.tour.result"
                )}`}
              {results.length > 1 &&
                `${t("search.tour.seeAll")} ${results.length} ${t(
                  "search.tour.results"
                )}`}
            </i>
          </u>
        </LLink>
        <ul className="list-group">
          {results.map((tour) => (
            <li key={tour.code}>
              <SearchItem tour={tour} />
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (!error && !isLoading && !hasText) {
    content = (
      <div className={styles.catalogue}>
        <div className="border-bottom">
          <h6>
            <strong>
              {t("general.europeTravel")} ({statistic.eu.totalCount} tour
              {statistic.eu.totalCount > 1 && "s"})
            </strong>
          </h6>

          <ul className="row ">
            {statistic.eu.countByPlace.map((country) => (
              <li
                key={country.place.slug}
                className="col-6 col-sm-4 mb-1 text-nowrap"
              >
                <LLink
                  to={`/du-lich/tim-kiem/${country.place.slug}`}
                  className="text-dark"
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
              {t("general.domesticTravel")} ({statistic.vn.totalCount} tour
              {statistic.vn.totalCount > 1 && "s"})
            </strong>
          </h6>
          <ul className="row">
            {statistic.vn.countByPlace.map((province) => (
              <li
                key={province.place.slug}
                className="col-6 col-sm-4 mb-1 text-nowrap"
              >
                <LLink
                  to={`/du-lich/tim-kiem/${province.place.slug}`}
                  className="text-dark"
                >
                  <strong>{province.place.name}</strong> ({province.toursCount}{" "}
                  {province.toursCount > 1 ? "tours" : "tour"})
                </LLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div
      className={styles.container + " tours border-bottom p-3"}
      ref={containerRef}
    >
      {content}
    </div>
  );
}

export default SearchResults;
