import React from "react";
import { EditExerciseValue } from "./EditExerciseValue";

import { ActivityValue } from "../../Styles/styles.js";

export const ActivityDetail = ({
  id,
  field,
  label,
  value,
  open,
  updateMutation,
}) => {
  return (
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
};
