import React from "react";
import { Query, Mutation } from "react-apollo";
import { Link } from "react-router-dom";

import { GET_EXERCISES, DELETE_EXERCISE } from "../Queries/exercises";

import { AddExercise } from "./AddExercise";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export const onDelete = (exerciseId, deleteExercise) => {
  console.log(exerciseId);
  deleteExercise({
    variables: { exerciseId },
  });
};

export const AllExercises = ({ match }) => {
  return (
    <Query query={GET_EXERCISES}>
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
        if (error) return `Error! fetching exercises.`;
        if (data.exercises.length === 0)
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
              {data.exercises.map(exercise => (
                <li key={exercise.id}>
                  <h4>
                    {(count = count + 1)}.{" "}
                    <Link to={`/sets/${exercise.id}`}> {exercise.name}</Link>
                    <Mutation
                      mutation={DELETE_EXERCISE}
                      refetchQueries={[{ query: GET_EXERCISES }]}
                    >
                      {deleteExercise => (
                        <button
                          onClick={() => onDelete(exercise.id, deleteExercise)}
                        >
                          Delete
                        </button>
                      )}
                    </Mutation>
                  </h4>
                </li>
              ))}
            </ul>

            <AddExercise />
          </div>
        );
      }}
    </Query>
  );
};
