import React from "react";
import { Mutation } from "react-apollo";
import { ADD_SET } from "../Queries/sets";

import { SetForm } from "./SetForm";

export const AddSet = () => {
  return (
    <div>
      <h1>New Set</h1>
      <Mutation mutation={ADD_SET}>
        {createSet => <SetForm onSubmit={createSet} />}
      </Mutation>
    </div>
  );
};
