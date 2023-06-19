import styles from "./Itinerary.module.css";
import QuillReader from "../QuillReader";
import TourCarousel from "../../TourCarousel";

function Itinerary({ data }) {
  return (
    <div className={styles.itinerary}>
      <div className="accordion tourDetail" id="accordionPanelsStayOpenExample">
        {data.map((item) => (
          <div
            className={styles.accordionItem + " accordion-item"}
            key={item.id}
          >
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
                <div className={styles.header}>
                  <h6>
                    <strong>{item.day}</strong>
                  </h6>
                  <h5>
                    <strong>{item.destination}</strong>
                  </h5>
                </div>
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
                    {item.images.length > 0 && (
                      <div className={styles.slider}>
                        <TourCarousel
                          height={"250px"}
                          isLoading={false}
                          slider={item.images}
                          size="sm"
                          centerPadding="40px"
                        />
                      </div>
                    )}
                    <QuillReader delta={item.content} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Itinerary;
