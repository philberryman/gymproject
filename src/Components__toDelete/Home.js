import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import GetTodos from "./GetTodos";

export var client;

const Home = props => {
  const ACCESS_TOKEN = localStorage.getItem("access_token");
  console.log(ACCESS_TOKEN);
  client = new ApolloClient({
    uri: "https://hasura-phil-todo.herokuapp.com/v1alpha1/graphql",
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  });

  console.log(props.auth);
  const { isAuthenticated } = props.auth;
  return (
    <div className="container">
      {isAuthenticated() && (
        <ApolloProvider client={client}>
          GetTodos
          <GetTodos auth={props.auth} />
        </ApolloProvider>
      )}
    </div>
  );
};

export default Home;
