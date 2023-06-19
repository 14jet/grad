// main
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

// components
import ErrorPage from "../../components/ErrorPage";
import Banner from "../../components/Banner";
import CardCarousel from "../../components/CardCarousel";
import VisaSearchResultItem from "./VisaSearchResultItem";

// other
import usePageTitle from "../../hooks/usePageTitle";
import { selectVisasCountries } from "../../store/visas.slice";

// css
import styles from "./Visa.module.css";
import VisaSliderItem from "./VisaSliderItem";

function VisaService() {
  const [mouseIsIn, setMouseIsIn] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const countries = useSelector(selectVisasCountries);
  const { status, error } = useSelector((state) => state.visa);
  const formRef = useRef();
  const results = countries.filter((country) => {
    return country.name.toLowerCase().includes(searchInput.toLowerCase());
  });

  const { t, i18n } = useTranslation();

  usePageTitle(t("pages.visaServices.title"));

  useEffect(() => {
    if (mouseIsIn) {
      const clickHandler = (e) => {
        if (!formRef.current.contains(e.target)) {
          setMouseIsIn(false);
        }
      };
      window.addEventListener("click", clickHandler);

      return () => window.removeEventListener("click", clickHandler);
    }
  }, [mouseIsIn]);

  if (error) return <ErrorPage code={error.httpCode} message={error.message} />;

  const onChangeSearchInput = (e) => {
    setSearchInput(e.target.value);
  };

  const onFocusSearchInput = () => {
    setMouseIsIn(true);
  };

  // content
  let noSearchResults = "Không có sản phẩm nào";
  if (i18n.language === "en") {
    noSearchResults = "Not matches anything";
  }

  let searchResultsJSX;
  if (searchInput && results && results.length === 0 && mouseIsIn)
    searchResultsJSX = (
      <p className="list-group list-group-flush shadow border w-100 p-2 bg-white rounded">
        {noSearchResults}
      </p>
    );

  if (searchInput && results && results.length > 0 && mouseIsIn)
    searchResultsJSX = (
      <ul className="list-group list-group-flush shadow border w-100 p-2 bg-white rounded">
        {results.map((item) => (
          <li key={item._id} className="list-group-item list-group-item-action">
            <VisaSearchResultItem visa={item} />
          </li>
        ))}
      </ul>
    );

  return (
    <>
      <Banner />
      <div className="container-lg">
        <div className="p-2 ">
          <form
            ref={formRef}
            className={styles.searchForm + " shadow p-3 mt-3 bg-white border "}
          >
            <h6>{t("pages.visaServices.searchBox.title")}</h6>
            <input
              className={styles.searchInput}
              value={searchInput}
              onChange={onChangeSearchInput}
              onFocus={onFocusSearchInput}
              type="text"
              placeholder={t("pages.visaServices.searchBox.placeholder")}
            />
            <div className={styles.searchResults}>{searchResultsJSX}</div>
          </form>
        </div>

        {/* quick visa  */}
        <div className={styles.quickVisa}>
          <h2 className="mb-2 pb-0">{t("pages.visaServices.quickVisa")}</h2>

          <div className={styles.chooseVisa}>
            <CardCarousel
              key={status}
              cards={countries.map((item) => ({
                card: <VisaSliderItem visa={item} />,
                id: item._id,
              }))}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default VisaService;
