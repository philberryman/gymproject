import React, { useContext } from "react";
import { Route, Router } from "react-router-dom";
import Callback from "./Components/Callback";
import Header from "./Components/Header";
import Login from "./Components/Login";

import HomeUser from "./Components/HomeUser.js";
import HomeAnonymous from "./Components/HomeAnonymous.js";

import Auth from "./Auth/Auth";
import history from "./history";

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { TokenContext } from "./index";

const auth = new Auth();
const { isAuthenticated } = auth;

const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
};

function PrivateRoute({ component: Component, ...rest }) {
  console.log(isAuthenticated());
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated() ? <Component {...props} /> : <Login />
      }
    />
  );
}

export const MakeMainRoutes = () => {
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
          <Route
            path="/home"
            render={props => <HomeAnonymous auth={auth} {...props} />}
          />
          <PrivateRoute
            path="/"
            component={props => <HomeUser auth={auth} {...props} />}
          />
          <Route
            path="/callback"
            render={props => {
              handleAuthentication(props);
              return <Callback {...props} />;
            }}
          />
        </div>
      </Router>
    </ApolloProvider>
  );
};
