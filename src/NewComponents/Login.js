import React from "react";
import Auth from "../Auth/Auth";

const auth = new Auth();

export const Login = props => {
  const { login } = auth;

  return (
    <div className="container">
      <h1>Login</h1>
      <button onClick={() => login()}>Login</button>
    </div>
  );
};
