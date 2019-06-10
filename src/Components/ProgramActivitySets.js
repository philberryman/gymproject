import React, { useState } from "react";
import { Mutation } from "react-apollo";

import {
  ActivitySetList,
  ActivitySetItem,
  ActivityValue,
  UpDownArrow,
  DoneDelete,
} from "../Styles/styles.js";

import PlusCircle from "../assets/plus-circle-solid.svg";
import MinusCircle from "../assets/minus-circle-solid.svg";
import TrashBin from "../assets/trash-alt-solid.svg";
import EditSolid from "../assets/edit-solid.svg";
import CheckCircle from "../assets/check-circle-solid.svg";

import {
  GET_PROGRAM_ACTIVITIES,
  UPDATE_ACTIVITY_WEIGHT,
  UPDATE_ACTIVITY_REPS,
  UPDATE_ACTIVITY_SETS,
} from "../Queries/programActivities";

export const ProgramActivitySets = ({ activitySets }) => {
  const [openId, setOpenId] = useState("jj");
  const openActivity = id => setOpenId(id === openId ? null : id);

  return (
    <ActivitySetList>
      {activitySets.map(activitySet => {
        const open = openId === activitySet.id;

        return (
          <ActivitySetItem key={activitySet.id} open={open}>
            <ActivityDetail
              id={activitySet.id}
              field="weight"
              label="KG"
              value={activitySet.weight}
              open={open}
              updateMutation={UPDATE_ACTIVITY_WEIGHT}
            />
            <ActivityDetail
              id={activitySet.id}
              field="reps"
              label="rep"
              value={activitySet.reps}
              open={open}
              updateMutation={UPDATE_ACTIVITY_REPS}
            />
            <ActivityDetail
              id={activitySet.id}
              field="sets"
              label="set"
              value={activitySet.sets}
              open={open}
              updateMutation={UPDATE_ACTIVITY_SETS}
            />
            <DoneDelete>
              {open ? (
                <>
                  <div onClick={() => openActivity(activitySet.id)}>
                    <img src={CheckCircle} alt="Done" height="22" width="22" />
                  </div>
                  <div>
                    <img src={TrashBin} alt="Delete" height="22" width="22" />
                  </div>
                </>
              ) : (
                <div onClick={() => openActivity(activitySet.id)}>
                  <img src={EditSolid} alt="Edit" height="20" width="20" />
                </div>
              )}
            </DoneDelete>
          </ActivitySetItem>
        );
      })}
    </ActivitySetList>
  );
};

const ActivityDetail = ({ id, field, label, value, open, updateMutation }) => (
  <div>
    {open && (
      <EditExerciseValue
        id={id}
        field={field}
        value={value}
        operator="plus"
        updateMutation={updateMutation}
      />
    )}
    <ActivityValue open={open}>
      {value} {value > 1 ? label + "s" : label}
    </ActivityValue>
    {open && (
      <EditExerciseValue
        id={id}
        field={field}
        value={value}
        operator="minus"
        updateMutation={updateMutation}
      />
    )}
  </div>
);

const EditExerciseValue = ({ id, field, value, operator, updateMutation }) => {
  const newValue = operator === "plus" ? value + 1 : value - 1;
  console.log(id);

  return (
    <Mutation
      mutation={updateMutation}
      refetchQueries={[
        {
          query: GET_PROGRAM_ACTIVITIES,
          variables: { id: 8 },
        },
      ]}
    >
      {updateValue => (
        <UpDownArrow
          onClick={() => {
            updateValue({ variables: { id: id, value: newValue } }).then(e =>
              console.log(e)
            );
          }}
        >
          {operator === "plus" ? (
            <img src={PlusCircle} alt="Plus" height="10" width="10" />
          ) : (
            <img src={MinusCircle} alt="Minus" height="10" width="10" />
          )}
        </UpDownArrow>
      )}
    </Mutation>
  );
};
