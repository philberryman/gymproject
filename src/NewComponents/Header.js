import React from "react";
import { Link } from "react-router-dom";

export const Header = props => {
  return (
    <div className="container">
      <h1>Header</h1>
      <ul>
        <li>
          <Link to="/programs">Programs</Link>
        </li>
        <li>
          <Link to="/exercises">Exercises</Link>
        </li>
        <li>
          <Link to="/sets">Sets</Link>
        </li>
      </ul>
    </div>
  );
};
