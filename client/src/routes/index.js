// const OtherComponent = React.lazy(() => import('./OtherComponent'));

// home
import Home from "../pages/Home";

// tour
import TourList from "../pages/TourList";
import TourDetail from "../pages/TourDetail";
import TourSearching from "../pages/TourSearching";

// about
import About from "../pages/About";

// visa
import Visa from "../pages/Visa";
import VisaPayment from "../pages/VisaPayment";
import VisaProducts from "../pages/VisaProducts";

// guides
import Guides from "../pages/Guides";
import Guide from "../pages/Guide";

// term
import Term from "../pages/Term";

// not found
import NotFound from "../pages/NotFound";

const routes = [
  {
    path: "",
    element: <Home />,
  },
  {
    paths: ["du-lich-chau-au", "du-lich-chau-au/:page"],
    element: <TourList category="europe" basePath="du-lich-chau-au" />,
  },
  {
    paths: ["du-lich-trong-nuoc", "du-lich-trong-nuoc/:page"],
    element: <TourList category="vietnam" basePath="du-lich-trong-nuoc" />,
  },
  {
    paths: [
      "du-lich/tim-kiem",
      "du-lich/tim-kiem/:placeOrPage",
      "du-lich/tim-kiem/:place/:page",
    ],
    element: <TourSearching />,
  },
  {
    path: "du-lich/:slug",
    element: <TourDetail />,
  },
  {
    path: "dich-vu-visa",
    element: <Visa />,
  },
  {
    path: "dich-vu-visa/:country",
    element: <VisaProducts />,
  },
  {
    path: "dich-vu-visa/thanh-toan/:orderId",
    element: <VisaPayment />,
  },
  {
    paths: ["guides", "guides/:page"],
    element: <Guides />,
  },
  {
    path: "guides/bai-viet/:slug",
    element: <Guide />,
  },
  {
    path: "dieu-khoan/:slug",
    element: <Term />,
  },
  {
    path: "gioi-thieu",
    element: <About />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
