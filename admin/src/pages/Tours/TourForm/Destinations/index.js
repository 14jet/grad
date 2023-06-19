import { useState } from "react";
import styles from "./Destinations.module.css";
import searchHelper from "../../../../services/helpers/searchHelper";

function Destinations({ title, places, formik }) {
  const [search, setSearch] = useState("");
  const destinations = formik.values.destinations;
  const setFieldValue = formik.setFieldValue;

  const changeHandler = (e) => {
    setSearch(e.target.value);
  };

  const choosePlaceHandler = (_id) => {
    setFieldValue("destinations", [...destinations, _id], false);
  };

  const removePlaceHandler = (_id) => {
    setFieldValue(
      "destinations",
      destinations.filter((dest) => dest !== _id),
      false
    );
  };

  // ************* lọc ra các địa điểm chưa chọn - đã chọn - tìm kiếm ***********
  // chưa chọn
  const remainItems = places.filter(
    (place) => !destinations.some((_id) => _id === place._id)
  );

  // chưa chọn được search
  const searchedItems = searchHelper(search, remainItems);

  // đã chọn
  const chosenItems = places.filter((place) =>
    destinations.some((_id) => place._id === _id)
  );

  // ***************** JSX CONTENT ******************
  // ----------------- địa điểm chưa chọn -----------
  let remainItemsJSX;
  if (remainItems.length === 0) {
    remainItemsJSX = (
      <p>
        <i>Không còn địa điểm nào</i>
      </p>
    );
  }

  if (remainItems.length > 0 && searchedItems.length === 0) {
    remainItemsJSX = (
      <p>
        <i>Không tìm thấy địa điểm nào</i>
      </p>
    );
  }

  if (searchedItems.length > 0) {
    remainItemsJSX = (
      <ul className="list-group">
        {searchedItems.map((item) => (
          <li
            className="list-group-item"
            key={item._id}
            onClick={() => choosePlaceHandler(item._id)}
          >
            {item.name}
          </li>
        ))}
      </ul>
    );
  }

  // ---------------- địa điểm đã chọn -------------
  let chosenItemsJSX;
  if (chosenItems.length === 0) {
    chosenItemsJSX = (
      <p>
        <i>Chưa chọn địa điểm nào</i>
      </p>
    );
  }

  if (chosenItems.length > 0) {
    chosenItemsJSX = (
      <ul className="list-group">
        {chosenItems.map((item) => {
          return (
            <li
              className="list-group-item"
              key={item._id}
              onClick={() => {
                removePlaceHandler(item._id);
              }}
            >
              {item.name}
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <div className={styles.container}>
      <h6 className="text-uppercase fw-bold">{title}</h6>
      <input
        type="text"
        className="form-control"
        value={search}
        onChange={changeHandler}
        placeholder="Tìm địa danh"
      />
      <div className="row mt-2">
        <div className="col-6">
          <h6>Địa điểm chưa chọn</h6>
          <div className={styles.listContainer}>{remainItemsJSX}</div>
        </div>

        <div className="col-6">
          <h6>Địa điểm đã chọn</h6>
          <div className={styles.listContainer + " " + styles.chosenItems}>
            {chosenItemsJSX}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Destinations;
