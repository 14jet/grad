import { useNavigate, useParams } from "react-router-dom";
import styles from "./GuidesFilter.module.css";

function GuidesFilter({ categories }) {
  const navigate = useNavigate();
  const params = new URL(document.location).searchParams;
  const search = params.get("search") || "";
  let { category } = useParams();
  if (!category) {
    category = "";
  }

  const changeCategoryHandler = (e) => {
    let path = `/guides/`;

    if (e.target.value) {
      path = `/guides/phan-loai/${e.target.value}`;
    }

    if (search) {
      path += `?search=${search}`;
    }
    navigate(path);
  };

  const searchHandler = (e) => {
    let path = `/guides/`;

    if (category) {
      path = `/guides/phan-loai/${category}`;
    }

    if (e.target.value) {
      path += `?search=${e.target.value.replace(/ /g, "%20")}`;
    }

    navigate(path);
  };

  return (
    <div className={styles.filter}>
      <select
        className="form-select w-auto"
        value={category}
        onChange={changeCategoryHandler}
      >
        <option value="">Danh mục</option>
        {categories.map((cat) => (
          <option key={cat.slug} value={cat.slug}>
            {cat.name}
          </option>
        ))}
      </select>

      <form>
        <input
          type="text"
          placeholder="Tìm kiếm..."
          value={search}
          onChange={searchHandler}
          className="form-control"
        />
      </form>
    </div>
  );
}

export default GuidesFilter;
