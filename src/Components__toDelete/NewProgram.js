import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

import { ProgramForm } from "./ProgramForm";

// import ProgramForm from "./ProgramForm";

export const NewProgram = () => {
  return (
    <div>
      <h1>New Program</h1>
      <Mutation mutation={NEW_PROGRAM}>
        {createProgram => <ProgramForm onSubmit={createProgram} />}
      </Mutation>
    </div>
  );
};

const NEW_PROGRAM = gql`
  mutation addProgram($name: String!) {
    insert_user_programs(objects: { name: $name }) {
      returning {
        id
        name
        description
        active
        user_id
      }
    }
  }
`;
