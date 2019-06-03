import React from "react";
import { Link } from "react-router-dom";

import Auth from "../Auth/Auth";

import { HomeContainer, BigButton } from "../Styles/styles.js";

const auth = new Auth();

export const Home = props => {
  const { logout } = auth;

  return (
    <HomeContainer>
      <BigButton background="#3DE27F">Start Workout</BigButton>
      <BigButton background="#9EB8E3">Manage Programs</BigButton>
      <BigButton background="#EFBAA3">View Logs</BigButton>

      <Link to="/programs">View Programs</Link>
      <button onClick={() => logout()}>log out</button>
    </HomeContainer>
  );
};
