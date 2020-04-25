import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Client as Styletron } from "styletron-engine-atomic";
import { Provider as StyletronProvider } from "styletron-react";
import { LightTheme, BaseProvider, styled } from "baseui";
import { StatefulInput } from "baseui/input";
import { CompanyDistance } from "./api";
import { Coordinates } from './types'
import * as api from "./api";
import FeatureMap from "./components/FeatureMap";

const engine = new Styletron();
const Centered = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
});

const loc1 = { lat: 40.7589, lng: -71.9851 };
const loc2 = { lat: 44.97592, lng: -93.27223 };
const loc3 = { lat: 40.7789, lng: -71.9851 };

// getCoordinatesFromZipCode(55402).then(console.log);
// firebase.getCompaniesById(['AyZI9OFpGemqJZ85f01q', 'XdY69pH9eaRMlhaJ5Bj0']);

function App() {
  const [userCoordinates, setUserCoordinates] = useState<Coordinates>();
  const [companyDistances, setCompanyDistances] = useState<CompanyDistance[]>(
    []
  );

  const fetchData = async () => {
    const coordinates = await api.getCoordinatesFromZipCode('55400')
    const companyDistances = await api.getCompanyDistances(coordinates, 10)
    setUserCoordinates(coordinates)
    setCompanyDistances(companyDistances)
  }

  useEffect(() => {
    fetchData()
  }, []);

  return (
    <div className="App">
      <StyletronProvider value={engine}>
        <BaseProvider theme={LightTheme}>
          {/* <Router>
          <Switch>
          <Route path="/mn/minneapolis/coffee" component={CompanyListingPage}/>
          <Route path="/" component={LandingPage}/>
          </Switch>
        </Router> */}
          <div>Hello World!</div>
          <StatefulInput />
          {userCoordinates && (
            <FeatureMap
              center={userCoordinates}
              options={companyDistances.map((cd) => ({
                id: cd.company.id,
                coordinates: cd.company.coordinates,
              }))}
            />
          )}
        </BaseProvider>
      </StyletronProvider>
    </div>
  );
}

export default App;
