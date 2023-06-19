import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

function LNavLink({ children, to, ...props }) {
  const lang = useTranslation().i18n.language;
  let path = to;
  if (lang !== "vi") {
    path = `/${lang}${to}`;
  }

  return (
    <NavLink to={path} {...props}>
      {children}
    </NavLink>
  );
}

export default LNavLink;
