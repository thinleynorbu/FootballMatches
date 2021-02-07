import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { Result } from './components/pages/Results';
import { ThemeProvider } from "react-jss";
import 'antd/dist/antd.css';
import { theme } from './theme';
import MatchForm from './components/pages/MatchForm';
import { Layout } from 'antd';
import { Sidebar } from './components/pages/Sidebar';
import { createUseStyles } from "react-jss";
import League from './components/pages/League';
import LeagueTable from './components/molecules/LeagueTable';
import ResultTable from './components/molecules/ResultTable';


const App = () => {

  let useStyles = createUseStyles((theme: any) => {
    return {
      container: {
        height: "-webkit-fill-available",
        width: "100%",
        display: "flex",
        flexDirection: "row"
      },
    };
  });
  const classes = useStyles()
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Layout className={classes.container}>
          <Sidebar />
          <Switch>
            <Route
              path="/league"
              component={() => {
                return (
                  <League />
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
            <Route
              path="/report"
              component={() => {
                return (
                  <Result />
                );
              }}
            />
            <Route
              render={() => <Redirect to="/report" />}
            />
          </Switch>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
