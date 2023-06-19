// main
import { useParams } from "react-router-dom";
import { format } from "date-fns";

// components
import ErrorPage from "../../components/ErrorPage";
import LLink from "../../components/LLink";
import GuideContentPlaceholder from "./GuideContentPlaceholder";

// other
import usePageTitle from "../../hooks/usePageTitle";
import QuillReader from "../../components/QuillReader";

// css
import styles from "./Guide.module.css";

import useScroll from "../../hooks/useScroll";
import useAxios from "../../hooks/useAxios";
import { useEffect } from "react";
import { fetchSingleGuide } from "../../services/apis";

function Guide() {
  const [sendRequest, isLoading, guide, error] = useAxios((data) => data.data);
  const { slug } = useParams();

  if (!guide) {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  }

  let title = guide?.title || "";
  usePageTitle(title);

  useScroll();

  useEffect(() => {
    sendRequest(fetchSingleGuide(slug));
  }, [slug]);

  if (error) {
    return <ErrorPage code={error.httpCode} message={error.message} />;
  }
  return (
    <div className="container-md mx-auto py-5">
      <div className="row">
        <div className="col-12 col-lg-10 mx-auto">
          {/* ==================== title ========================  */}
          <h1 className="mb-4 pb-1 text-dark fw-bold text-center">
            {guide && !isLoading && guide.title}
            {isLoading && <span className="placeholder col-8"></span>}
          </h1>

          {/* ==================== breadcrumb ========================  */}
          <h6 className="text-dark">
            {guide && !isLoading && (
              <>
                <LLink
                  className={styles.breadCrumb + " text-dark"}
                  to="/guides"
                >
                  Guides
                </LLink>{" "}
                /{" "}
                <LLink
                  className={styles.breadCrumb + " text-dark"}
                  to={`/guides/${guide.category.slug}`}
                >
                  {guide.category.name}
                </LLink>
              </>
            )}

            {isLoading && <span className="placeholder col-4" />}
          </h6>

          {/* ==================== author ========================  */}
          <div className={styles.author}>
            <div
              className={
                styles.nameLetter + " " + (isLoading && "bg-secondary")
              }
            >
              {guide && !isLoading && guide.author.slice(0, 1)}
              {isLoading && <span className="placeholder col-1 " />}
            </div>
            <div className={styles.info}>
              <p className={styles.name}>
                {guide && !isLoading && guide.author}
                {isLoading && <span className="placeholder col-4 " />}
              </p>
              <p className={styles.time}>
                {guide &&
                  !isLoading &&
                  format(new Date(guide.createdAt), "dd/MM/yyyy")}
                {isLoading && <span className="placeholder col-2" />}
              </p>
            </div>
          </div>
        </div>

        {/* ==================== content ========================  */}
        <div className="col-12 col-lg-7 mx-auto">
          <div className={styles.content}>
            {guide && !isLoading && <QuillReader delta={guide.content} />}
            {isLoading && <GuideContentPlaceholder />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Guide;
