// main
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

// components
import GuideCard from "../../components/GuideCard";
import GuideCardPlaceholder from "../../components/placeholders/GuideCardPlaceholder";
import ProductsListLayout from "../../layout/ProductsListLayout";
import ErrorPage from "../../components/ErrorPage";
import Banner from "../../components/Banner";

// other
import usePageTitle from "../../hooks/usePageTitle";
import useScroll from "../../hooks/useScroll";
import * as pageHelper from '../../services/helpers/pageHelpers'


function Guides() {
  const navigate = useNavigate();
  const language = useTranslation().i18n.language;
  let {  page } = useParams();
  page = pageHelper.getPage(page)

  let { guides, status, error } = useSelector((state) => state.guides);
  const isLoading = status === "idle" || status === "pending";

  usePageTitle("Guides");
  useScroll({
    reScroll: { top: 500 },
    dependencies: [page],
  });

  const pageCount = pageHelper.getTotalPage(guides)

  if (page == -1) {
    let path = `/guides`;

    if (language !== "vi") {
      path = `/${language}${path}`;
    }

    navigate(path);
  }

  const changePageHandler = (num) => {
    let path = `/guides/${num}`;

    if (language !== "vi") {
      path = `/${language}${path}`;
    }

    navigate(path);
  };



  const pagedGuides = pageHelper.getItems(guides, page)

  const cards = pagedGuides.map((guide) => ({
    component: <GuideCard data={guide} />,
    id: guide.slug,
  }));


  if (error) return <ErrorPage code={error.httpCode} message={error.message} />;


  return (
    <>
      <Banner/>

      <ProductsListLayout
        title='Guides'
        pagination={{
          pageCount: pageCount,
          currentPage: page,
          changePageHandler: changePageHandler,
        }}
        products={cards}
        placeholder={<GuideCardPlaceholder />}
        isLoading={isLoading}
        status={status}
      />
    </>
  );
}

export default Guides;
