import React from "react";
import { Query, Mutation } from "react-apollo";
import { Link } from "react-router-dom";

import { GET_SETS, DELETE_SET } from "../Queries/sets";

import { AddSet } from "./AddSet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export const onDelete = (setId, deleteSet) => {
  console.log(setId);
  deleteSet({
    variables: { setId },
  });
};

export const AllSets = ({ match }) => {
  return (
    <Query query={GET_SETS}>
      {({ loading, error, data }) => {
        if (loading)
          return (
            <h2>
              Loading...{" "}
              <FontAwesomeIcon
                icon={faSpinner}
                style={{ color: "blue" }}
                spin
              />
            </h2>
          );
        if (error) return `Error! fetching todos.`;
        if (data.sets.length === 0)
          return (
            <div>
              <h3>No Todos Created Yet</h3>
              {/* <AddSet /> */}
            </div>
          );
        let count = 0;
        return (
          <div>
            <ul>
              {data.sets.map(set => (
                <li key={set.id}>
                  <h4>
                    {(count = count + 1)}.{" "}
                    <Link to={`/sets/${set.id}`}> {set.name}</Link>
                    <Mutation
                      mutation={DELETE_SET}
                      refetchQueries={[{ query: GET_SETS }]}
                    >
                      {deleteSet => (
                        <button onClick={() => onDelete(set.id, deleteSet)}>
                          Delete
                        </button>
                      )}
                    </Mutation>
                  </h4>
                </li>
              ))}
            </ul>

            <AddSet />
          </div>
        );
      }}
    </Query>
  );
};
