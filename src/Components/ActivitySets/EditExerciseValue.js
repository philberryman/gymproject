import React from "react";
import { Mutation } from "react-apollo";
import Url from "url-parse";

import { GET_PROGRAM_ACTIVITIES } from "../../Queries/programActivities";

import PlusCircle from "../../assets/plus-circle-solid.svg";
import MinusCircle from "../../assets/minus-circle-solid.svg";

import { UpDownArrow } from "../../Styles/styles.js";

export const EditExerciseValue = ({
  id,
  field,
  value,
  operator,
  updateMutation,
}) => {
  const newValue = operator === "plus" ? value + 1 : value - 1;
  const currentUrl = new Url(window.location);
  const programId = Number(currentUrl.pathname.split("/")[2]);

  return (
    <Mutation
      mutation={updateMutation}
      refetchQueries={[
        {
          query: GET_PROGRAM_ACTIVITIES,
          variables: { id: programId },
        },
      ]}
    >
      {updateValue => (
        <UpDownArrow
          onClick={() => {
            updateValue({ variables: { id: id, value: newValue } });
          }}
        >
          {operator === "plus" ? (
            <img
              src={PlusCircle}
              alt={"increase " + field}
              height="22"
              width="22"
            />
          ) : (
            <img src={MinusCircle} alt="Minus" height="22" width="22" />
          )}
        </UpDownArrow>
      )}
    </Mutation>
  );
};
