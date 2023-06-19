import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import { removeUser } from "../store/user.slice";
import { useRef } from "react";
import { toggleSidebar } from "../store/layout.slice";
import Logo from "../components/Logo";
import GoToTopButton from "../components/GoToTopButton";

import {
  creditCard as creditCardSVG,
  plane as planeSVG,
  phone as phoneSVG,
  earth as earthSVG,
  newspaper as newspaperSVG,
  book as bookSVG,
  cash as cashSVG,
  exit as exitSvg,
  toggleOff as toggleOffSVG,
  toggleOn as toggleOnSVG,
  users as usersSVG,
} from "./layoutIcons";

import styles from "./Layout.module.css";

const navItems = [
  {
    path: "/tours",
    icon: planeSVG,
    label: "Tour",
  },
  {
    path: "/guides",
    icon: newspaperSVG,
    label: "Guides",
  },
  {
    path: "/visas",
    icon: creditCardSVG,
    label: "Visa",
  },
  {
    path: "/dieu-khoan",
    icon: bookSVG,
    label: "Điều khoản",
  },
  {
    path: "/diem-den",
    icon: earthSVG,
    label: "Điểm đến",
  },
  {
    path: "/thong-tin-cong-ty",
    icon: phoneSVG,
    label: "Thông tin công ty",
  },
  {
    path: "/don-hang",
    icon: cashSVG,
    label: "Đơn hàng",
    role: "admin",
  },
  {
    path: "/users",
    icon: usersSVG,
    label: "User",
  },
];

function Layout({ children }) {
  const dispatch = useDispatch();
  const contentRef = useRef();
  const sidebarIsShow = useSelector((state) => state.layout.sidebar.isShow);

  const toggleSidebarHandler = () => {
    dispatch(toggleSidebar());
  };

  const logoutHandler = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    dispatch(removeUser());
  };

  const navLinkClasses = (props) => {
    let classes = "d-flex align-items-center p-2 rounded";
    if (!sidebarIsShow) {
      classes += "  justify-content-center";
    }
    if (props?.isActive) return classes + " bg-primary text-light";
    return classes + " text-dark";
  };

  let sidebarClasses = styles.sidebar;

  if (!sidebarIsShow) {
    sidebarClasses += " " + styles.hide;
  }

  const goToTopHandler = () => {
    if (contentRef.current) {
      contentRef.current.scroll({ top: 0, left: 0, behavior: "smooth" });
    }
  };

  const { user } = useSelector((state) => state.user);

  return (
    <>
      <main className={styles.container + " bg-secondary"}>
        <div className={styles.main}>
          {user && (
            <div
              className={
                sidebarClasses +
                " bg-light shadow border p-3 joya__sidebar me-2"
              }
            >
              <div
                className={
                  styles.brand +
                  " d-flex align-items-center gap-2 fs-5 fw-bold border-bottom border-bottom-2 pb-3 justify-content-center"
                }
              >
                <a
                  styles={
                    sidebarIsShow
                      ? { transform: "scale(.5);", display: "block" }
                      : {}
                  }
                  href="http://vvvv.space"
                  className={
                    styles.logo + ` ${sidebarIsShow ? undefined : styles.small}`
                  }
                >
                  <Logo />
                </a>
              </div>
              <div className="border-bottom text-center py-2 orverflow-hidden w-100">
                <p className="m-0 w-100 overflow-hidden">
                  <Link title={user.username} to="/users">
                    {user.username}
                  </Link>
                  <br />
                </p>
                <p className="m-0 text-secondary fw-light">
                  <i>{user.role}</i>
                </p>
              </div>

              <ul className={styles.nav + " mt-2 p-0"}>
                {navItems.map((navItem) => (
                  <li key={navItem.path} className="mb-1">
                    <NavLink
                      className={navLinkClasses}
                      to={navItem.path}
                      end={navItem.end}
                      title={sidebarIsShow ? undefined : navItem.label}
                    >
                      {navItem.icon}{" "}
                      {sidebarIsShow && (
                        <span className="ms-2">{navItem.label}</span>
                      )}
                    </NavLink>
                  </li>
                ))}

                <li
                  onClick={logoutHandler}
                  className="text-danger border-top mt-3"
                >
                  <NavLink
                    className={navLinkClasses}
                    to="/logout"
                    onClick={(e) => e.preventDefault()}
                  >
                    <span className="text-danger">{exitSvg}</span>
                    {sidebarIsShow && (
                      <span className="text-danger ms-2">Log out</span>
                    )}
                  </NavLink>
                </li>
              </ul>
            </div>
          )}

          <div ref={contentRef} className={styles.content} id="admin__content">
            {children}
          </div>
        </div>

        {user && (
          <footer className={styles.footer + " bg-dark text-light p-3"}>
            <button className={styles.toggleBtn} onClick={toggleSidebarHandler}>
              {sidebarIsShow ? (
                <span className="text-success">{toggleOnSVG}</span>
              ) : (
                <span className="text-danger">{toggleOffSVG}</span>
              )}
            </button>
            <a
              className="text-center m-0 d-block text-light hover-underline"
              href="http://vvvv.space"
            >
              vvvv.space
            </a>
          </footer>
        )}
      </main>

      <GoToTopButton onGoToTop={goToTopHandler} />
    </>
  );
}

export default Layout;
