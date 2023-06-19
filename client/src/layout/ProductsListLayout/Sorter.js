import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import styles from "./ProductsListLayout.module.css";

function Sorter({ onSort, sortValue }) {
  const { t } = useTranslation();

  const sortList = useMemo(
    () => [
      {
        label: t("components.sort.sort"),
        value: "",
      },
      {
        label: t("components.sort.priceAscending"),
        value: "price-asc",
      },
      {
        label: t("components.sort.priceDescending"),
        value: "price-desc",
      },
      {
        label: t("components.sort.durationAscending"),
        value: "duration-asc",
      },
      {
        label: t("components.sort.durationDescending"),
        value: "duration-desc",
      },
    ],
    []
  );

  return (
    <div className={styles.filter}>
      <select onChange={onSort} value={sortValue}>
        {sortList.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Sorter;
