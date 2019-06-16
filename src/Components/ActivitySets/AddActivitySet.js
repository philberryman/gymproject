import React from "react";
import { Mutation } from "react-apollo";
import Url from "url-parse";

import {
  GET_PROGRAM_ACTIVITIES,
  ADD_ACTIVITY_SET,
} from "../../Queries/programActivities";

import { AddSetLink } from "../../Styles/styles.js";

export const AddActivitySet = ({ activitySets }) => {
  const mostRecentActivity = activitySets[activitySets.length - 1];
  const {
    activity_id,
    exercise_id,
    weight,
    sets,
    reps,
    order,
  } = mostRecentActivity;

  const currentUrl = new Url(window.location);
  const programId = Number(currentUrl.pathname.split("/")[2]);

  const nextOrder = order + 1;
  return (
    <Mutation
      mutation={ADD_ACTIVITY_SET}
      refetchQueries={[
        {
          query: GET_PROGRAM_ACTIVITIES,
          variables: { id: programId },
        },
      ]}
    >
      {addSet => (
        <AddSetLink
          onClick={() => {
            addSet({
              variables: {
                activityId: activity_id,
                exerciseId: exercise_id,
                weight,
                sets,
                reps,
                nextOrder,
              },
            });
          }}
        >
          Add Set
        </AddSetLink>
      )}
    </Mutation>
  );
};
