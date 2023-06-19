import React, { useState } from "react";
import { Collapse } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import QuillReader from "../../../../components/QuillReader";

import styles from "./VisaDetail.module.css";
import "./VisaDetail.override.css";
import { useTranslation } from "react-i18next";

function VisaDetail({ product }) {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  const toggle = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <>
      <button className={styles.toggleBtn + " text-danger"} onClick={toggle}>
        {isOpen
          ? t("pages.visaCountry.collapse")
          : t("pages.visaCountry.seeDetails")}
      </button>

      <Collapse in={isOpen}>
        <div className="VisaDetail">
          <Tab.Container defaultActiveKey="detail">
            <Row>
              <Col sm={3}>
                <Nav variant="pills" className="flex-column">
                  <Nav.Item>
                    <Nav.Link eventKey="detail">
                      {t("pages.visaCountry.details.details")}
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="price_includes">
                      {" "}
                      {t("pages.visaCountry.details.priceIncludes")}
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="price_excludes">
                      {t("pages.visaCountry.details.priceExcludes")}
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="terms">
                      {" "}
                      {t("pages.visaCountry.details.terms")}
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="cancellation_policy">
                      {t("pages.visaCountry.details.cancellationPolicies")}
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col sm={9}>
                <Tab.Content>
                  <Tab.Pane eventKey="detail">
                    <div className="bg-light border p-2 rounded h-100 w-100">
                      <QuillReader delta={product.detail} />
                    </div>
                  </Tab.Pane>
                  <Tab.Pane eventKey="price_includes">
                    <div className="bg-light border p-2 rounded h-100 w-100">
                      <QuillReader delta={product.price_policies.includes} />
                    </div>
                  </Tab.Pane>
                  <Tab.Pane eventKey="price_excludes">
                    <div className="bg-light border p-2 rounded h-100 w-100">
                      <QuillReader delta={product.price_policies.excludes} />
                    </div>
                  </Tab.Pane>
                  <Tab.Pane eventKey="terms">
                    <div className="bg-light border p-2 rounded h-100 w-100">
                      <QuillReader delta={product.terms.notes} />
                    </div>
                  </Tab.Pane>
                  <Tab.Pane eventKey="cancellation_policy">
                    <div className="bg-light border p-2 rounded h-100 w-100">
                      <QuillReader delta={product.terms.cancellation} />
                    </div>
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </div>
      </Collapse>
    </>
  );
}

export default VisaDetail;
