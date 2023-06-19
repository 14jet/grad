// main
import { useLocation, Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";

// components
import LNavLink from "../../components/LNavLink";
import LLink from "../../components/LLink";
import NavTopBar from "./NavTopBar";
import Search from "./Search";

// other
import config from "../../configs";
import "./navbar.css";
import Logo from "../Logo";

function Header() {
  const [expanded, setExpanded] = useState(false);
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const language = i18n.language;

  const navItems = [
    {
      label: t("header.navBar.home"),
      to: "/",
    },
    {
      label: t("header.navBar.euTours"),
      to: "/du-lich-chau-au",
    },
    {
      label: t("header.navBar.viTours"),
      to: "/du-lich-trong-nuoc",
    },
    {
      label: t("header.navBar.visaService"),
      to: "/dich-vu-visa",
    },
    {
      label: t("header.navBar.about"),
      to: "/gioi-thieu",
    },
    {
      label: t("header.navBar.guides"),
      to: "/guides",
    },
  ];
  useEffect(() => {
    if (expanded) {
      setExpanded(false);
    }
  }, [location]);

  let LogoComponent = LLink;

  if (
    location.pathname === "/" ||
    location.pathname === `/${language}` ||
    location.pathname === `/${language}/`
  ) {
    LogoComponent = "a";
  }

  const isShowSearchBar = !(
    location.pathname.startsWith("/du-lich/tim-kiem") ||
    location.pathname.slice(3).startsWith("/du-lich/tim-kiem")
  );
  return (
    <>
      <div className="travel__navbar">
        <div className="container-fluid travel__navbar__inner">
          <NavTopBar />
          <Navbar
            expand="lg"
            bg="white"
            expanded={expanded}
            onToggle={() => setExpanded((prev) => !prev)}
          >
            <Container fluid>
              <Navbar.Brand>
                <LogoComponent
                  to="/"
                  href={`${
                    language === "vi"
                      ? config.domain
                      : `${config.domain}/${language}`
                  }`}
                  className="travel__navbar__branch"
                >
                  <Logo />
                </LogoComponent>
              </Navbar.Brand>

              <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-lg`} />

              <Navbar.Offcanvas placement="end" className="mobileNavbar">
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title id="offcanvasNavbarLabel-expand-lg">
                    <div className="travel__navbar__branch">
                      <Logo />
                    </div>
                  </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <Nav className="justify-content-end flex-grow-1 pe-3">
                    {navItems.map((item) => (
                      <LNavLink
                        key={item.to}
                        to={item.to}
                        end={item.to === "/"}
                      >
                        {item.label}
                      </LNavLink>
                    ))}
                  </Nav>
                  {isShowSearchBar && (
                    <div className="d-lg-flex align-items-center d-none">
                      <Search />
                    </div>
                  )}
                </Offcanvas.Body>
              </Navbar.Offcanvas>
            </Container>
          </Navbar>

          {isShowSearchBar && (
            <div className="container-fluid pb-3 d-block d-sm-none">
              <Search />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Header;
