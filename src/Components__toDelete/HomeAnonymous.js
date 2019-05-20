import React from "react";

import GetTodos from "./GetTodos";
import Auth from "../Auth/Auth";

export var client;

const auth = new Auth();

const Home = props => {
  const { login } = auth;

  console.log(props.auth);
  return (
    <div className="container">
      <GetTodos auth={props.auth} />
      <h1>Home Anonymous Component</h1>
      <button onClick={() => login()}>log in</button>
      )}
    </div>
  );
};

export default Home;
