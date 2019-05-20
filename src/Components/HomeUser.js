import React from "react";
import { Link } from "react-router-dom";

import Auth from "../Auth/Auth";

const auth = new Auth();

const HomeUser = props => {
  const { logout } = auth;

  return (
    <div className="container">
      <h1>Home User Component</h1>
      <Link to="/programs">View Programs</Link>
      <button onClick={() => logout()}>log out</button>
    </div>
  );
};

export default HomeUser;
