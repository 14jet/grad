import { useNavigate, useParams, useLocation } from "react-router-dom";
import styles from "./Filter.module.css";

function Filter() {
  const navigate = useNavigate();
  const params = new URL(document.location).searchParams;
  const search = params.get("search") || "";
  const location = useLocation();
  let { category, page } = useParams();

  if (!category || !["chau-au", "viet-nam"].includes(category.trim())) {
    category = "";
  }

  const changeCategoryHandler = (e) => {
    let path = "/tours";

    if (e.target.value) {
      path = `/tours/phan-loai/${e.target.value}`;
    }

    if (search) {
      path += `?search=${search}`;
    }

    navigate(path);
  };

  const changeSearchInputHandler = (e) => {
    let path = "/tours";
    if (category) {
      path = `/tours/phan-loai/${category}`;
    }

    if (e.target.value) {
      path += `?search=${e.target.value.replace(/ /g, "%20")}`;
    }

    navigate(path);
  };

  return (
    <div className={styles.filter + " bg-light p-2 rounded  border-bottom"}>
      <select
        value={category}
        onChange={changeCategoryHandler}
        className="form-select w-auto"
      >
        <option value="">Danh mục</option>
        <option value="chau-au">Tour châu Âu</option>
        <option value="viet-nam">Tour Việt Nam</option>
      </select>

      <form>
        <input
          type="text"
          placeholder="Tìm kiếm..."
          value={search}
          onChange={changeSearchInputHandler}
          className="form-control me-1"
        />
      </form>
    </div>
  );
}

export default Filter;
