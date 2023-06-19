import { useTranslation } from "react-i18next";

function RedAsterisk() {
  const { t } = useTranslation();
  return (
    <span
      style={{ cursor: "help" }}
      title={t("form.required")}
      className="text-danger"
    >
      *
    </span>
  );
}

export default RedAsterisk;
