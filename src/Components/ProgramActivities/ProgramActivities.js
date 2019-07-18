import React, { useState } from "react";
import { Query } from "react-apollo";
import { GET_PROGRAM_ACTIVITIES } from "./queries.js";
import Url from "url-parse";

import {
  ProgramList,
  UnstyledList,
  ActivityHeader,
  ActivityName,
  OpenClose,
} from "./styles.js";

import { ProgramActivitySets } from "./ProgramActivitySets";
import { AddProgramActivity } from "./AddProgramActivity";

export const ProgramActivities = () => {
  var currentUrl = new Url(window.location);
  const programId = Number(currentUrl.pathname.split("/")[2]);
  const [open, setOpen] = useState(null);

  return (
    <Query query={GET_PROGRAM_ACTIVITIES} variables={{ id: programId }}>
      {({ loading, error, data }) => {
        const { program_activities, programs } = data;

        if (loading) {
          return null;
        }
        if (error) return `Error! fetching todos.`;
        if (programs.length === 0) {
          console.log("programs length equal zero");
          return (
            <div>
              <AddProgramActivity
                programActivities={program_activities}
                programId={programId}
              />
            </div>
          );
        }

        return (
          <UnstyledList>
            {program_activities.map((programActivity, index) => {
              return (
                <ProgramList key={programActivity.id}>
                  <ActivityHeader
                    onClick={() =>
                      setOpen(
                        programActivity.id === open ? null : programActivity.id
                      )
                    }
                    open={programActivity.id === open}
                  >
                    <ActivityName>{programActivity.activity.name}</ActivityName>
                    <OpenClose>+</OpenClose>
                  </ActivityHeader>
                  {programActivity.id === open && (
                    <ProgramActivitySets
                      activitySets={programActivity.activity.activity_sets}
                      programId={programId}
                    />
                  )}
                </ProgramList>
              );
            })}
            <AddProgramActivity
              programActivities={program_activities}
              programId={programId}
            />
          </UnstyledList>
        );
      }}
    </Query>
  );
};
