import { useTranslation } from "react-i18next";
import { useEffect, useState, useRef } from "react";
import { magnifyingGlass as searchSVG } from "../../../assets/svgs";
import { useLocation } from "react-router-dom";
import SearchResults from "./SearchResults";
import styles from "./Search.module.css";

function Search() {
  const [isSearching, setIsSearching] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const { t } = useTranslation();

  const location = useLocation();
  const searchRef = useRef();
  const inputRef = useRef();

  useEffect(() => {
    setSearchTerm("");
    setIsSearching(false);
  }, [location]);

  return (
    <div className={styles.searchbar} ref={searchRef}>
      <input
        ref={inputRef}
        type="text"
        placeholder={t("search.tour.searchForTour")}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onFocus={() => setIsSearching(true)}
      />

      <div className={styles.spinner}>
        {/* <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          className="bi bi-search"
          viewBox="0 0 16 16"
        >
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
        </svg> */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      </div>

      {isSearching && (
        <div className={styles.results}>
          <SearchResults
            inputRef={inputRef}
            onHide={() => setIsSearching(false)}
            searchTerm={searchTerm}
          />
        </div>
      )}
    </div>
  );
}

export default Search;
