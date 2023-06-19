import { useRef } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import SearchResults from "./SearchResults";
import styles from "./TourSearching.module.css";

function SearchBar() {
  const [isSearching, setIsSearching] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { t } = useTranslation();

  const inputRef = useRef();

  return (
    <div className={styles.searchBar}>
      <h6>{t("search.tour.title")}</h6>
      <input
        placeholder={t("search.tour.placholder")}
        ref={inputRef}
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onFocus={() => setIsSearching(true)}
      />

      {isSearching && (
        <div className={styles.resultsContainer}>
          <SearchResults
            onHide={() => {
              setIsSearching(false);
              setSearchTerm("");
            }}
            inputRef={inputRef}
            searchTerm={searchTerm}
          />
        </div>
      )}
    </div>
  );
}

export default SearchBar;
