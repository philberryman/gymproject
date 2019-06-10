import React, { useState } from "react";

import {
  UnstyledList,
  ActivityItem,
  ActivityHeader,
  ActivityName,
  OpenClose,
} from "../Styles/styles.js";

import { ProgramActivitySets } from "./ProgramActivitySets";
import { AddProgramActivity } from "./AddProgramActivity";

export const ProgramActivities = ({ programActivities, programId }) => {
  const [open, setOpen] = useState(null);
  return (
    <UnstyledList>
      {programActivities.map(programActivity => {
        return (
          <ActivityItem key={programActivity.id}>
            <ActivityHeader
              onClick={() =>
                setOpen(programActivity.id === open ? null : programActivity.id)
              }
              open={programActivity.id === open}
            >
              <ActivityName> {programActivity.activity.name}</ActivityName>
              <OpenClose>+</OpenClose>
            </ActivityHeader>
            {programActivity.id === open && (
              <ProgramActivitySets
                activitySets={programActivity.activity.activity_sets}
              />
            )}
          </ActivityItem>
        );
      })}
      <AddProgramActivity
        programActivities={programActivities}
        programId={programId}
      />
    </UnstyledList>
  );
};
