import { useNavigate } from "react-router-dom";

import styles from "./VisasFilter.module.css";

function VisasFilter() {
  const navigate = useNavigate();
  const params = new URL(document.location).searchParams;
  const search = params.get("search") || "";

  const changeSearchInputHandler = (e) => {
    let path = "/visas";
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

export default VisasFilter;
