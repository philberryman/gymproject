import React, { useContext } from "react";
import { Route, Router, Switch } from "react-router-dom";
import Callback from "./Callback";
import Header from "./Header";
import Login from "./Login";
import UserPrograms from "./UserPrograms";
import UserProgramSets from "./UserProgramSets";
import UserSetExercises from "./UserSetExercises";
import HomeUser from "./HomeUser.js";

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
  const ACCESS_TOKEN = localStorage.getItem("access_token");
  const client = new ApolloClient({
    uri: "https://hasura-phil-todo.herokuapp.com/v1alpha1/graphql",
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  });
  const token = useContext(TokenContext);

  console.log(token);
  return (
    <ApolloProvider client={client}>
      <Router history={history}>
        <div>
          <Route path="/" render={props => <Header auth={auth} {...props} />} />
          <Switch>
            <Route
              path="/home"
              render={props => <HomeUser auth={auth} {...props} />}
            />
            <PrivateRoute
              path="/programs/:programId/:setId"
              component={props => <UserSetExercises auth={auth} {...props} />}
            />
            <PrivateRoute
              path="/programs/:id"
              component={props => <UserProgramSets auth={auth} {...props} />}
            />
            <PrivateRoute
              path="/programs"
              component={props => <UserPrograms auth={auth} {...props} />}
            />
            <Route
              path="/callback"
              render={props => {
                handleAuthentication(props);
                return <Callback {...props} />;
              }}
            />
            <PrivateRoute
              path="/"
              component={props => <HomeUser auth={auth} {...props} />}
            />
          </Switch>
        </div>
      </Router>
    </ApolloProvider>
  );
};
