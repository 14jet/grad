import { useEffect, useRef } from "react";
import quillGetHTML from "../../services/helpers/quillGetHTML";
import "./QuillReader.css";

function QuillReader({ delta }) {
  const containerRef = useRef();

  useEffect(() => {
    containerRef.current.innerHTML = quillGetHTML(delta);
  }, [delta]);
  return <div className="quillReader" ref={containerRef}></div>;
}

export default QuillReader;
