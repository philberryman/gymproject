import React from "react";
import { Mutation } from "react-apollo";
import { CREATE_EXERCISE } from "./queries";
import { ExerciseForm } from "./ExerciseForm";

export const CreateExercise = ({ history }) => {
  return (
    <div>
      <h1>New Exercise</h1>
      <Mutation mutation={CREATE_EXERCISE}>
        {createExercise => (
          <ExerciseForm history={history} onSubmit={createExercise} />
        )}
      </Mutation>
    </div>
  );
};
