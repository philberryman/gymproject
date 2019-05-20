import React from "react";
import { Mutation } from "react-apollo";
import { ADD_PROGRAM } from "../Queries/programs";

import { ProgramForm } from "./ProgramForm";

export const AddProgram = () => {
  return (
    <div>
      <h1>New Program</h1>
      <Mutation mutation={ADD_PROGRAM}>
        {createProgram => <ProgramForm onSubmit={createProgram} />}
      </Mutation>
    </div>
  );
};
