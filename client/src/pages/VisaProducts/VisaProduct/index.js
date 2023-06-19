import { Collapse } from "react-bootstrap";
import VisaDetail from "./VisaDetail";
import { useState } from "react";
import VisaBooking from "./VisaBooking";

import styles from "./VisaProduct.module.css";
import { useTranslation } from "react-i18next";

function VisaProduct({ product }) {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  const toggle = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <>
      <div className="row">
        <div className="col-12 col-md-4 mb-3 mb-md-0">
          <div>
            <h5 className="fw-bold ">{product.name}</h5>
          </div>
        </div>

        <div className="col-6 col-md-4">
          <div className={styles.price + " text-danger"}>
            <p className="m-0 fs-3 d-flex align-items-center justify-content-md-center">
              <strong>{product.price.toLocaleString()} USD</strong>
            </p>
          </div>
        </div>

        <div className="col-6 col-md-4">
          <div className="d-flex justify-content-end">
            <button
              onClick={toggle}
              className={styles.chooseBtn + " " + (isOpen && styles.active)}
            >
              {isOpen ? t("buttons.discard") : t("buttons.choose")}
            </button>
          </div>
        </div>
      </div>

      <Collapse in={isOpen}>
        <div className="mt-2">
          <VisaBooking product={product} />
        </div>
      </Collapse>

      <div className="mt-3">
        <VisaDetail product={product} />
      </div>
    </>
  );
}

export default VisaProduct;
