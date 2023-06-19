import { useSelector } from "react-redux";
import { searchHelper } from "../services/helpers/searchHelper";
import { useMemo } from "react";

function useSearchTour(searchTerm) {
  const { vnTours, euTours, status } = useSelector((state) => state.tours);
  const tours = useMemo(() => {
    return [...vnTours, ...euTours];
  }, [status]);

  let str = searchTerm.toLowerCase().trim() || "";

  if (str) return tours.filter((tour) => searchHelper(str, tour.name));

  return tours;
}

export default useSearchTour;
