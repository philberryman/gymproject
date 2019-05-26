import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export const LoadingOrError = ({ loading, error }) => {
  console.log("loading");
  if (loading)
    return (
      <h2>
        Loading...{" "}
        <FontAwesomeIcon icon={faSpinner} style={{ color: "blue" }} spin />
      </h2>
    );
  if (error) return `Error! fetching todos.`;
};
