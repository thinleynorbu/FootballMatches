import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Result } from './components/pages/Results';
import { ThemeProvider } from "react-jss";
import 'antd/dist/antd.css';
import { theme } from './theme';
import MatchForm from './components/pages/MatchForm';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Switch>
          <Route
            path="/"
            exact
            component={() => {
              return (
                <div>
                  home
                </div>
              );
            }}
          />
          <Route
            path="/report"
            component={() => {
              return (
                <Result />
              );
            }}
          />
           <Route
            path="/match-form/:id?"
            component={() => {
              return (
                <MatchForm />
              );
            }}
          />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
