import { useNavigate, useLocation } from "react-router-dom";
import styles from "./PlacesFilter.module.css";

function PlacesFilter() {
  const navigate = useNavigate();
  const params = new URL(document.location).searchParams;
  const search = params.get("search") || "";
  const location = useLocation();

  const changeSearchInputHandler = (e) => {
    let path = location.pathname;
    path = "/diem-den";

    if (e.target.value) {
      path += `?search=${e.target.value.replace(/ /g, "%20")}`;
    }

    navigate(path);
  };

  return (
    <div className={styles.filter}>
      <form>
        <input
          className="form-control me-1"
          type="text"
          placeholder="Tìm kiếm..."
          value={search}
          onChange={changeSearchInputHandler}
        />
      </form>
    </div>
  );
}

export default PlacesFilter;
