import React, { useState } from "react";
import { Query, Mutation } from "react-apollo";
import { LoadingOrError } from "./LoadingOrError";

import {
  GET_SET_EXERCISES,
  ADD_EXERCISE_TO_SET,
} from "../Queries/setExercises";

import { GET_EXERCISES } from "../Queries/exercises";

export const AddSetExercise = ({ programSets, setId }) => {
  const [exerciseId, setExerciseId] = useState("");
  const [weight, setWeight] = useState("");
  const [reps, setReps] = useState("");
  const [rest, setRest] = useState("");
  const [type, setType] = useState("");

  console.log(setId);
  console.log(exerciseId);

  return (
    <Query query={GET_EXERCISES}>
      {({ loading, error, data }) => {
        const { exercises } = data;

        if (loading || error) return <LoadingOrError loading error />;

        return (
          <Mutation mutation={ADD_EXERCISE_TO_SET}>
            {addExerciseSet => (
              <form
                onSubmit={e => {
                  console.log({ exerciseId, setId, weight, reps, rest, type });
                  e.preventDefault();
                  addExerciseSet({
                    variables: { exerciseId, setId, weight, reps, rest, type },
                    refetchQueries: [{ query: GET_SET_EXERCISES }],
                  })
                    .then(() => {
                      setWeight("");
                    })
                    .catch(e => console.log(e));
                }}
              >
                <label htmlFor="exercise-select">Select Exercise:</label>

                <select
                  id="exercise-select"
                  onChange={e => setExerciseId(e.target.value)}
                  value={exerciseId}
                >
                  {exercises.map(exercise => (
                    <option key={exercise.id} value={exercise.id}>
                      {exercise.name}
                    </option>
                  ))}
                </select>
                <input
                  onChange={e => setWeight(e.target.value)}
                  type="text"
                  placeholder="weight"
                  value={weight}
                />
                <br />
                <input
                  onChange={e => setReps(e.target.value)}
                  type="text"
                  placeholder="reps"
                  value={reps}
                />
                <br />
                <input
                  onChange={e => setRest(e.target.value)}
                  type="text"
                  placeholder="rest"
                  value={rest}
                />
                <br />
                <input
                  onChange={e => setType(e.target.value)}
                  type="text"
                  placeholder="type"
                  value={type}
                />
                <button type="submit">Submit</button>
              </form>
            )}
          </Mutation>
        );
      }}
    </Query>
  );
};
