import SliderPortion from "../../../components/SliderPortion";
import GuideCard from "../../../components/GuideCard";
import TourCard from "../../../components/TourCard";
import GuideCardPlaceholder from "../../../components/placeholders/GuideCardPlaceholder";
import TourCardPlaceholder from "../../../components/placeholders/TourCardPlaceholder";

function HomeRow({ title, rowData, type, to }) {
  const { status, data, error } = rowData;

  let CardPlaceholder;
  let Card;

  if (type === "tour") {
    CardPlaceholder = TourCardPlaceholder;
    Card = TourCard;
  }

  if (type === "guide") {
    CardPlaceholder = GuideCardPlaceholder;
    Card = GuideCard;
  }

  let cards = []; // [ { card: <SpecificCard />, id: uid } ]

  if (status === "idle" || status === "pending") {
    cards = new Array(6).fill(1).map((_, index) => ({
      card: <CardPlaceholder />,
      id: index,
    }));
  }

  if (status === "succeeded") {
    cards = data.map((item) => ({
      card: <Card data={item} />,
      id: item.slug,
    }));
  }

  let errorMessage = "";
  if (error) {
    errorMessage = error.httpCode
      ? error.httpCode + " - " + error.message
      : error.message;
  }

  return (
    <SliderPortion
      title={title}
      to={to} // link cho nút "xem tất cả"
      error={errorMessage}
      cards={cards}
    />
  );
}

export default HomeRow;
