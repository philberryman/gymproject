import React from "react";
import { Mutation } from "react-apollo";
import Url from "url-parse";

import {
  GET_PROGRAM_ACTIVITIES,
  ACTIVITY_SET_UPDATE_ORDER,
} from "../../Queries/programActivities";

import { UpDownArrow } from "../../Styles/styles.js";

import ChevronUp from "../../assets/chevron-up-solid.svg";
import ChevronDown from "../../assets/chevron-down-solid.svg";

export const ActivityOrderUpDown = ({
  currentPosition,
  direction,
  newPosition,
  currentId,
  newId,
  activitySet,
}) => {
  const currentUrl = new Url(window.location);
  const programId = Number(currentUrl.pathname.split("/")[2]);

  return (
    <UpDownArrow>
      {newPosition != null && (
        <Mutation
          mutation={ACTIVITY_SET_UPDATE_ORDER}
          refetchQueries={[
            {
              query: GET_PROGRAM_ACTIVITIES,
              variables: { id: programId },
            },
          ]}
        >
          {updateOrder => {
            return (
              <>
                <img
                  onClick={() => {
                    updateOrder({
                      variables: {
                        id: activitySet.id,
                        activityId: activitySet.activity_id,
                        exerciseId: activitySet.exercise_id,
                        weight: activitySet.weight,
                        reps: activitySet.reps,
                        sets: activitySet.sets,
                        order: activitySet.order,
                        newOrder: newPosition,
                        switchId: newId,
                      },
                    });
                  }}
                  src={direction === "up" ? ChevronUp : ChevronDown}
                  alt="Plus"
                  height="22"
                  width="22"
                />
              </>
            );
          }}
        </Mutation>
      )}
    </UpDownArrow>
  );
};
