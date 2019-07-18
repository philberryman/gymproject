import React from "react";
import { Mutation } from "react-apollo";
import { ADD_PROGRAM } from "./queries";
import { ProgramForm } from "./ProgramForm";

export const AddProgram = ({ history }) => {
  return (
    <div>
      <h1>New Program</h1>
      <Mutation mutation={ADD_PROGRAM}>
        {createProgram => (
          <ProgramForm history={history} onSubmit={createProgram} />
        )}
      </Mutation>
    </div>
  );
};
