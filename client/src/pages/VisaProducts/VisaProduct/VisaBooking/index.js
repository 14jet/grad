import React, { useState } from "react";
import styles from "./VisaBooking.module.css";
import VisaBookingModal from "./VisaBookingModal";
import RoundedButton from "../../../../components/RoundedButton";
import { useTranslation } from "react-i18next";

function VisaBooking({ product }) {
  let [passengers, setGuesses] = useState(1); // guest
  const [date, setDate] = useState("");
  const [isShowModal, setIsShowModal] = useState(false);
  const { t } = useTranslation();

  const formatter = new Intl.NumberFormat("en-US", {
    currency: "USD",
    minimumFractionDigits: 0,
  });

  const guessesQtyHandler = (num) => {
    if (passengers === 1 && num === -1) return;
    setGuesses((prev) => prev + num);
  };

  return (
    <>
      <VisaBookingModal
        product={product}
        show={isShowModal}
        passengers={passengers}
        date={date}
        onHide={() => setIsShowModal(false)}
      />

      <div className="row border rounded py-2">
        <div className="col-12 col-md-3 d-flex justify-content-center justify-content-md-start align-items-center">
          <div className="w-100 mb-3 mb-md-0">
            <label className="text-center w-100 fw-bold fs-6 mb-2">
              {t("pages.visaCountry.entryDate")}
            </label>

            <div className="d-flex justify-content-center">
              <input
                className={styles.datePicker + " p-2 w-100"}
                type="date"
                onChange={(e) => setDate(e.target.value)}
                value={date}
              />
            </div>
          </div>
        </div>

        <div className="col-12 col-md-3 d-flex justify-content-center align-items-center">
          <div className={styles.borderBottom + " w-100 mb-3"}>
            <label className="text-center w-100 fw-bold fs-6 mb-2">
              {t("pages.visaCountry.applyFor")}
            </label>
            <p className="d-flex align-items-center justify-content-center">
              <button
                onClick={() => guessesQtyHandler(-1)}
                className={
                  styles.plusBtn +
                  (passengers === 1 ? " opacity-25 pe-none" : "")
                }
              >
                -
              </button>

              <span>
                {passengers} {t("pages.visaCountry.passenger")}
              </span>

              <button
                onClick={() => guessesQtyHandler(1)}
                className={styles.plusBtn}
              >
                +
              </button>
            </p>
          </div>
        </div>

        <div className="col-12 col-md-3 d-flex justify-content-center align-items-center">
          <div className="w-100 mb-3 boder-bottom">
            <label className="text-center w-100 fw-bold fs-6 mb-2">
              {t("pages.visaCountry.total")}
            </label>
            <p className="text-center fw-bold fs-6">
              <span className="price">
                {formatter.format(product.price * passengers)}
              </span>{" "}
              USD/
              <span className="count">{passengers}</span>{" "}
              {t("pages.visaCountry.passenger")}
            </p>
          </div>
        </div>

        <div className="col-12 col-md-3 d-flex align-items-center justify-content-center justify-content-md-end">
          <RoundedButton
            className={styles.bookBtn + " mb-3"}
            onClick={() => setIsShowModal(true)}
          >
            {t("buttons.book")}
          </RoundedButton>
        </div>
      </div>
    </>
  );
}

export default VisaBooking;
