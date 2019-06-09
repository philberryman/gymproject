import React from "react";
import { Link } from "react-router-dom";

import Auth from "../Auth/Auth";

import { CenteredContainer, BigButton } from "../Styles/styles.js";

const auth = new Auth();

export const Home = props => {
  const { logout } = auth;

  return (
    <CenteredContainer>
      <Link to="/programs">
        <BigButton background="#3DE27F">Programs</BigButton>
      </Link>
      <BigButton background="#9EB8E3">Results</BigButton>
      <BigButton background="#EFBAA3">Profile</BigButton>

      <button onClick={() => logout()}>log out</button>
    </CenteredContainer>
  );
};
