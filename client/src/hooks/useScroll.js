import { useEffect, useState } from "react";

function useScroll(
  options = {
    firstScroll: { top: 0, left: 0, behavior: "auto" },
    reScroll: null,
    dependencies: [],
  }
) {
  const [isFirstRender, setIsFirstRender] = useState(true);

  if (isFirstRender) {
    window.scroll(options.firstScroll || { top: 0, left: 0, behavior: "auto" });
  }

  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false);
    }

    if (!isFirstRender && options.reScroll) {
      window.scroll({
        top: options.reScroll.top || 0,
        left: options.reScroll.left || 0,
        behavior: options.reScroll.behavior || "auto",
      });
    }
  }, [...(options.dependencies || [])]);
}

export default useScroll;
