// main
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import React, { useEffect } from "react";
import GoToTop from "./components/GoToTop";
import DefaultLayout from "./layout/DefaultLayout";
import routes from "./routes";
import { fetchTours } from "./store/tours.slice";
import { fetchGuides } from "./store/guides.slice";
import { fetchVisas } from "./store/visas.slice";
import { fetchCompanyInfo } from "./store/company.slice";
import { useTranslation } from "react-i18next";
import FacebookMessenger from "./components/facebooks/FacebookMessenger";
import { ORIGINAL_LANGUAGE } from "./services/languages/i18n";

function App() {
  const dispatch = useDispatch();
  const language = useTranslation().i18n.language;
  const isForeignLanguage = language !== ORIGINAL_LANGUAGE;

  useEffect(() => {
    dispatch(fetchTours());
    dispatch(fetchGuides());
    dispatch(fetchCompanyInfo());
    dispatch(fetchVisas());
  }, []);

  return (
    <>
      <GoToTop />
      <FacebookMessenger />

      <Routes>
        {isForeignLanguage && (
          <Route path={`:${language}`}>
            <Route element={<DefaultLayout />}>
              {routes.map((route) => {
                if (route.path || route.path === "") {
                  if (route.path === "") {
                    return (
                      <Route
                        key={route.path}
                        index={true}
                        element={route.element}
                      />
                    );
                  } else {
                    return (
                      <Route
                        key={route.path}
                        path={route.path}
                        element={route.element}
                      />
                    );
                  }
                } else {
                  return route.paths.map((path) => (
                    <Route key={path} path={path} element={route.element} />
                  ));
                }
              })}
            </Route>
          </Route>
        )}

        {!isForeignLanguage && (
          <Route path="/">
            <Route element={<DefaultLayout />}>
              {routes.map((route) => {
                if (route.path || route.path === "") {
                  if (route.path === "") {
                    return (
                      <Route
                        key={route.path}
                        index={true}
                        element={route.element}
                      />
                    );
                  } else {
                    return (
                      <Route
                        key={route.path}
                        path={route.path}
                        element={route.element}
                      />
                    );
                  }
                } else {
                  return route.paths.map((path) => (
                    <Route key={path} path={path} element={route.element} />
                  ));
                }
              })}
            </Route>
          </Route>
        )}
      </Routes>
    </>
  );
}

export default App;
