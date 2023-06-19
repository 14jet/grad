import { useEffect, useRef, useState } from "react";
import placeholder from "../../assets/images/lazyImg.jpg";

const LazyImg = (props) => {
  const [inView, setInView] = useState(false);
  const placeholderRef = useRef();

  console.log("From LazyImg: ", inView);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            obs.disconnect();
          }
        }
      },
      {
        rootMargin: "50px",
      }
    );
    observer.observe(placeholderRef.current);
    return () => {
      observer.disconnect();
    };
  }, []);

  return inView ? (
    <img {...props} alt={props.alt || ""} />
  ) : (
    <img
      {...props}
      ref={placeholderRef}
      src={placeholder}
      alt={props.alt || ""}
    />
  );
};
export default LazyImg;
