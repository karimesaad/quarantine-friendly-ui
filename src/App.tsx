import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import {Client as Styletron} from 'styletron-engine-atomic';
import {Provider as StyletronProvider} from 'styletron-react';
import {LightTheme, BaseProvider, styled} from 'baseui';
import {StatefulInput} from 'baseui/input';
const engine = new Styletron();
const Centered = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
});


function App() {
  return (
    <div className="App">
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>
        <Router>
          <Switch>
          <Route path="/mn/minneapolis/coffee" component={CompanyListingPage}/>
          <Route path="/" component={LandingPage}/>
          </Switch>
        </Router>
        <StatefulInput />
      </BaseProvider>
    </StyletronProvider>
    </div>
  );
}

export default App;
