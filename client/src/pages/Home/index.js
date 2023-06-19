// main
import React, { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

// components
import Intro from "./Intro";
import Container from "../../components/Container";
import HomeRow from "./HomeRow";
import ErrorBoundary from "../../components/ErrorBoundary";
import Banner from "../../components/Banner";

// other
import usePageTitle from "../../hooks/usePageTitle";

// css
import styles from "./Home.module.css";

function Home() {
  const { t } = useTranslation();

  // tours
  const {
    vnTours,
    euTours,
    status: toursStatus,
    error: toursError,
  } = useSelector((state) => state.tours);

  // net VN tours
  const newVnTours = useMemo(() => {
    return vnTours.slice(0, 6);
  }, [toursStatus]);

  // new EU tours
  const newEuTours = useMemo(() => {
    return euTours.slice(0, 6);
  }, [toursStatus]);

  // new Guides
  const {
    guides,
    status: guidesStatus,
    error: guidesError,
  } = useSelector((state) => state.guides);
  const newGuides = guides.slice(0, 6);

  useEffect(() => {
    window.scroll({ top: 0 });
  }, []);

  usePageTitle(t("pages.home.title"));
  return (
    <>
      <ErrorBoundary>
        <Banner />
      </ErrorBoundary>

      <Container>
        <div className={styles.welcome}>
          <ErrorBoundary>
            <Intro />
          </ErrorBoundary>
        </div>

        <ErrorBoundary>
          <HomeRow
            title={t("general.europeTravel")}
            rowData={{
              data: newEuTours,
              status: toursStatus,
              error: toursError,
            }}
            type="tour"
            to="/du-lich-chau-au"
          />
        </ErrorBoundary>

        <ErrorBoundary>
          <HomeRow
            title={t("general.domesticTravel")}
            rowData={{
              data: newVnTours,
              status: toursStatus,
              error: toursError,
            }}
            type="tour"
            to="/du-lich-trong-nuoc"
          />
        </ErrorBoundary>

        <ErrorBoundary>
          <HomeRow
            title={t("general.guides")}
            rowData={{
              data: newGuides,
              status: guidesStatus,
              error: guidesError,
            }}
            type="guide"
            to="/guides"
          />
        </ErrorBoundary>
      </Container>
    </>
  );
}
export default Home;
