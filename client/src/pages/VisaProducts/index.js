// main
import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

// components
import VisaProduct from "./VisaProduct";
import Container from "../../components/Container";
import VisaIntro from "./VisaIntro";

// other
import usePageTitle from "../../hooks/usePageTitle";
import useAxios from "../../hooks/useAxios";
import styles from "./VisaProducts.module.css";
import { useSelector } from "react-redux";
import { fetchVisasByCountry } from "../../services/apis";
import { selectVisasCountries } from "../../store/visas.slice";
import Banner from "../../components/Banner";
import { imageDimensions } from "../../services/constants";
import { useTranslation } from "react-i18next";

function VisaProducts() {
  const [sendRequest, isLoading, data, error, resetStates] = useAxios(
    (response) => response.data
  );
  const { t } = useTranslation();

  const { country } = useParams();
  const countries = useSelector(selectVisasCountries);
  const foundCountry = countries.find((item) => item.slug === country);
  const countryId = foundCountry?._id;

  useEffect(() => {
    sendRequest(fetchVisasByCountry(countryId));
  }, [countryId]);

  usePageTitle(`${t("pages.visaCountry.title")} ${foundCountry?.name}`);
  return (
    <>
      <Banner />
      <Container>
        <div className="mt-5">
          <div className="d-flex gap-4 align-items-center justify-content-between border-bottom pb-5">
            <div>
              <h1 className="fs-4 fw-bold border-bottom pb-3">
                {t("pages.visaCountry.title")}{" "}
                {data && data[0] && data[0].country.name}
              </h1>

              <VisaIntro />
            </div>

            <div className={styles.countryImage}>
              <img src={`${foundCountry?.image}?${imageDimensions.md}`} />
            </div>
          </div>
          <div>
            <div>
              <h5 className={styles.chooseProductTitle}>
                {t("pages.visaCountry.chooseService")}
              </h5>

              <ul className={styles.products}>
                {data &&
                  data.length > 0 &&
                  data.map((visa) => (
                    <li key={visa._id}>
                      <VisaProduct product={visa} />
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

export default VisaProducts;
