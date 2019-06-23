import React, { useContext } from "react";
import { Route, Router, Switch } from "react-router-dom";
import { Callback } from "./Callback";
import { Header } from "./Header";
import { Login } from "./Login";
import { AllPrograms } from "./AllPrograms";
import { Program } from "./Program";
// import { SetExercises } from "./SetExercises";
// import { AllSets } from "./AllSets";
// import { AllExercises } from "./AllExercises";

import { Home } from "./Home.js";
import { WholeScreen, MainContainer } from "../Styles/styles.js";

import Auth from "../Auth/Auth";
import history from "../history";

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

import { TokenContext } from "../index";

const auth = new Auth();
const { isAuthenticated } = auth;

const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
};

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated() ? <Component {...props} /> : <Login />
      }
    />
  );
}

export const App = () => {
  const ID_TOKEN = localStorage.getItem("id_token");

  console.log("env: " + process.env.REACT_APP_ENVIRONMENT);

  const host = () => {
    if (process.env.REACT_APP_ENVIRONMENT === "local") {
      return (
        window.location.protocol +
        "//" +
        window.location.hostname +
        ":7070/v1/graphql"
      );
    } else {
      return "https://projectgym-hasura.herokuapp.com/v1/graphql";
    }
  };

  console.log("host: " + host());

  const client = new ApolloClient({
    uri: host(),
    headers: {
      Authorization: `Bearer ${ID_TOKEN}`,
    },
  });

  // Only being used to force re-render on login. Should refactor this to cleaner solution
  const token = useContext(TokenContext);
  //  ^^^^^^^^

  return (
    <ApolloProvider client={client}>
      <Router history={history}>
        <WholeScreen className={module}>
          <Route path="/" render={props => <Header auth={auth} {...props} />} />
          <MainContainer>
            <Switch>
              <Route
                path="/home"
                render={props => <Home auth={auth} {...props} />}
              />
              {/* <PrivateRoute
                path="/sets/:setId"
                component={props => <SetExercises auth={auth} {...props} />}
              />
              <PrivateRoute
                path="/programs/:id/:setId"
                component={props => <SetExercises auth={auth} {...props} />}
              /> */}
              <PrivateRoute
                path="/programs/:id"
                component={props => <Program auth={auth} {...props} />}
              />
              <PrivateRoute
                path="/programs"
                component={props => <AllPrograms auth={auth} {...props} />}
              />
              {/* <PrivateRoute
                path="/sets"
                component={props => <AllSets auth={auth} {...props} />}
              /> */}
              {/* <PrivateRoute
                path="/exercises"
                component={props => <AllExercises auth={auth} {...props} />}
              /> */}
              <Route
                path="/callback"
                render={props => {
                  handleAuthentication(props);
                  return <Callback {...props} />;
                }}
              />
              <PrivateRoute
                path="/"
                component={props => <Home auth={auth} {...props} />}
              />
            </Switch>
          </MainContainer>
          <div>{token.value}</div>
          <div>{host}</div>
        </WholeScreen>
      </Router>
    </ApolloProvider>
  );
};
