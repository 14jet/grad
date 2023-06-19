import { useEffect, useRef } from "react";

function PaginationInput(props) {
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);
  return <input ref={inputRef} type="text" {...props} />;
}

export default PaginationInput;
