// main
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import usePageTitle from "../../hooks/usePageTitle";

// components
import TourCard from "../../components/TourCard";
import TourCardPlaceholder from "../../components/placeholders/TourCardPlaceholder";
import ErrorPage from "../../components/ErrorPage";
import ProductsListLayout from "../../layout/ProductsListLayout";
import ErrorBoundary from "../../components/ErrorBoundary";
import useSearchTour from "../../hooks/useSearchTour";
import Banner from "../../components/Banner";

// apis
import { useSelector } from "react-redux";
import SearchBar from "./SearchBar";
import { useEffect } from "react";
import * as pageHelper from '../../services/helpers/pageHelpers'


function TourSearching() {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const lang = i18n.language;
  const location = useLocation();

  // lấy params
  const params = new URL(document.location).searchParams;
  const sort = params.get("sort") || "";
  const searchTerm = params.get("search") || "";
  let { place, page, placeOrPage } = useParams();

  if (placeOrPage) {
    if (!isNaN(Number(placeOrPage)) && Number.isInteger(Number(placeOrPage))) {
      page = Number(placeOrPage);
    } else {
      place = placeOrPage;
    }
  }

  page = pageHelper.getPage(page)

  const { status, error } = useSelector((state) => state.tours);

  // lọc tours
  let totalTours = useSearchTour(searchTerm);
  let placeName = place;
  const destinationMatches = (dest) => {
    // nước
    if (dest.country?.slug === place) return dest.country.name;
    if (dest.type === "country" && dest.slug === place) return dest.name;

    // tỉnh
    if (dest.province?.slug === place) return dest.province.name;
    if (dest.type === "province" && dest.slug === place) return dest.name;

    // thành phố thuộc trung ương
    if (!dest.province && dest.type === "city" && dest.slug === place)
      return dest.name;
    if (!dest.province && dest.city?.slug === place) return dest.city.name;

    return false;
  };

  if (place) {
    totalTours = totalTours.filter((tour) =>
      tour.destinations.some((dest) => {
        const nameMatches = destinationMatches(dest);
        if (nameMatches) {
          placeName = nameMatches;
          return true;
        }
        return false;
      })
    );
  }

  const sortHandler = (e) => {
    let path = location.pathname;

    if (searchTerm) {
      path += `?search=${searchTerm}`;
      if (e.target.value) {
        path += `&sort=${e.target.value}`;
      }
    } else {
      if (e.target.value) {
        path += `?sort=${e.target.value}`;
      }
    }

    navigate(path);
  };

  const changePageHandler = (num) => {
    let path = "";
    if (place) {
      path = `/du-lich/tim-kiem/${place}/${num}`;
    } else {
      path = `/du-lich/tim-kiem/${num}/`;
    }

    if (searchTerm) {
      path += `?search=${searchTerm}`;
      if (sort) {
        path += `&sort=${sort}`;
      }
    } else {
      if (sort) {
        path += `?sort=${sort}`;
      }
    }

    if (lang === "vi") return navigate(path);
    navigate(`/${lang}${path}`);
  };

  let tours = pageHelper.getItems(totalTours, page);

  if (sort === "") {
    tours = tours.sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
  }

  if (sort === "price-desc") {
    tours = tours.sort((a, b) => b.price - a.price);
  }

  if (sort === "price-asc") {
    tours = tours.sort((a, b) => a.price - b.price);
  }

  if (sort === "duration-asc") {
    tours = tours.sort((a, b) => b.days - a.days);
  }

  if (sort === "duration-asc") {
    tours = tours.sort((a, b) => a.days - b.days);
  }

  const products = tours.map((tour) => ({
    component: <TourCard data={tour} />,
    id: tour._id,
  }));

  const pageCount = pageHelper.getTotalPage(totalTours);

  // ********** side effects *************
  let title = lang === "vi" ? "Tìm kiếm tour" : "Search for tours";

  if (place) {
    title =
      lang === "en"
        ? `Tours list for ${placeName}`
        : `Danh sách tour ${placeName}`;
  }

  if (searchTerm) {
    title += `: "${searchTerm}"`;
  }

  usePageTitle(title);
  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  }, [location]);

  return (
    <>
      <Banner />

      <div className="text-center py-3"></div>

      {status !== "failed" && (
        <div className="mt-4">
          <SearchBar />
        </div>
      )}

      {!error && (
        <ErrorBoundary>
          <ProductsListLayout
            title={title}
            pagination={{
              pageCount: pageCount,
              currentPage: Number(page),
              changePageHandler: changePageHandler,
            }}
            products={products}
            onSort={sortHandler}
            placeholder={<TourCardPlaceholder />}
            status={status}
            sort={sort}
          />
        </ErrorBoundary>
      )}

      {error && <ErrorPage code={error.httpCode} message={error.message} />}
    </>
  );
}

export default TourSearching;
