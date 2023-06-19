import styles from "./Tabs.module.css";
import QuillReader from "../QuillReader";
import "./DropdownItems.override.css";

function Tabs({ data }) {
  return (
    <div className="accordion tourDetail" id="accordionPanelsStayOpenExample">
      {data.map((item) => (
        <div className="accordion-item" key={item.id}>
          <h2
            className="accordion-header"
            id={`panelsStayOpen-heading${item.id}`}
          >
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={`#panelsStayOpen-collapse${item.id}`}
              aria-expanded="true"
              aria-controls={`panelsStayOpen-collapse${item.id}`}
            >
              <h5 className={styles.title}>
                <strong>{item.title}</strong>
              </h5>
            </button>
          </h2>
          <div
            id={`panelsStayOpen-collapse${item.id}`}
            className="accordion-collapse collapse"
            aria-labelledby={`panelsStayOpen-heading${item.id}`}
          >
            <div className="accordion-body">
              <div className={styles.body}>
                <div className="content ">
                  <QuillReader delta={item.content} />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Tabs;
