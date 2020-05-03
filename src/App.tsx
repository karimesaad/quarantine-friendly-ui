import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import {
  QueryParamProvider,
  useQueryParam,
  StringParam,
  NumberParam,
  useQueryParams,
} from "use-query-params";
import { Client as Styletron } from "styletron-engine-atomic";
import { Provider as StyletronProvider } from "styletron-react";
import { LightTheme, BaseProvider, styled } from "baseui";
import { StatefulInput } from "baseui/input";
import { CompanyDistance } from "./api";
import CompanyListingPage from "./pages/CompanyListingPage";
import LandingPage from "./pages/LandingPage";
import { stringify } from "querystring";
import AddCompanyPage from "./pages/AddCompanyPage";
import { createTheme } from "baseui";
const primitives = {
  primaryFontFamily: "Kollektif",
};
const theme = createTheme(primitives);

const engine = new Styletron();

interface HandleSubmitParams {
  zipcode: string;
  radius: number;
}

function App() {
  // const [zipcode, setZipcode] = useQueryParam("zipcode", StringParam);
  // const [radius, setRadius] = useQueryParam("radius", NumberParam);
  const [queryParams, setQueryParams] = useQueryParams({
    zipcode: StringParam,
    radius: NumberParam,
  });

  const zipcode = queryParams.zipcode;
  const radius = queryParams.radius;

  const shouldShowLandingPage = !zipcode || !radius;
  const handleSubmit = (submitValues: HandleSubmitParams) => {
    setQueryParams(submitValues);
  };

  return (
    <div className="App">
      <StyletronProvider value={engine}>
        <BaseProvider theme={theme}>
          {shouldShowLandingPage && <LandingPage onSubmit={handleSubmit} />}
          {!shouldShowLandingPage && (
            <CompanyListingPage
              zipcode={zipcode as string}
              radius={radius as number}
            />
          )}
          {/* <AddCompanyPage /> */}
        </BaseProvider>
      </StyletronProvider>
    </div>
  );
}

export default App;
