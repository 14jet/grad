import { useTranslation } from "react-i18next";
import usePageTitle from "../../hooks/usePageTitle";
import { useEffect } from "react";

function About() {
  const { t } = useTranslation();
  usePageTitle(t("pages.about.title"));

  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  return (
    <div className="p-2">
      <p className="text-center mt-5 pt-5">About page</p>
    </div>
  );
}

export default About;
