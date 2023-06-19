import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

function LLink({ children, to, ...props }) {
  const lang = useTranslation().i18n.language;
  let path = to;
  if (lang !== "vi") {
    path = `/${lang}${to}`;
  }

  return (
    <Link to={path} {...props}>
      {children}
    </Link>
  );
}

export default LLink;
