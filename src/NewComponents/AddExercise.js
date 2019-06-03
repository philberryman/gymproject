import React from "react";
import { Mutation } from "react-apollo";
import { ADD_EXERCISE } from "../Queries/exercises";
import { ExerciseForm } from "./ExerciseForm";

export const AddExercise = () => {
  return (
    <div>
      <h1>New Exercise</h1>
      <Mutation mutation={ADD_EXERCISE}>
        {createExercise => <ExerciseForm onSubmit={createExercise} />}
      </Mutation>
    </div>
  );
};
