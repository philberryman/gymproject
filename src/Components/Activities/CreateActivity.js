import React from "react";
import { Mutation } from "react-apollo";
import { CREATE_ACTIVITY } from "./queries";
import { ActivityForm } from "./ActivityForm";

export const CreateActivity = ({ history }) => {
  return (
    <div>
      <h1>New Exercise</h1>
      <Mutation mutation={CREATE_ACTIVITY}>
        {createActivity => (
          <ActivityForm history={history} onSubmit={createActivity} />
        )}
      </Mutation>
    </div>
  );
};
