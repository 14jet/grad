import styles from "./ProductsListLayout.module.css";
import Container from "../../components/Container";
import Pagination from "../../components/Pagination";
import { useTranslation } from "react-i18next";
import Sorter from "./Sorter";

function ProductsListLayout({
  pagination,
  title,
  onSort,
  products,
  placeholder,
  status,
  sort,
}) {
  const { pageCount, currentPage, changePageHandler } = pagination;
  const { t } = useTranslation();

  let content;

  // succeeded && have products
  if (status === "succeeded" && products.length > 0)
    content = products.map(({ component, id }) => (
      <div
        key={id}
        className={styles.product + " col-12 col-sm-6 col-md-4 col-lg-3 mb-4"}
      >
        {component}
      </div>
    ));

  // succeeded && no products
  if (status === "succeeded" && products.length === 0)
    content = <p>{t("general.noProducts")}</p>;

  // loading
  if (status === "idle" || status === "pending")
    content = new Array(12).fill(1).map((item, index) => (
      <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
        {placeholder}
      </div>
    ));

  return (
    <Container>
      <div className={styles.header}>
        <h1>{title}</h1>

        {onSort && <Sorter onSort={onSort} sortValue={sort} />}
      </div>

      <div className={styles.content}>
        <div className="row">{content}</div>
      </div>

      {status === "succeeded" && pageCount > 0 && (
        <Pagination
          total={pageCount}
          pagenumber={currentPage}
          callback={changePageHandler}
        />
      )}
    </Container>
  );
}

export default ProductsListLayout;
