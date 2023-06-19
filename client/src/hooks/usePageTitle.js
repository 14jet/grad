import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const usePageTitle = (title) => {
  const { t } = useTranslation();
  useEffect(() => {
    document.title = `${title} | ${t("general.companyName")}`;
  }, [title]);
};

export default usePageTitle;
