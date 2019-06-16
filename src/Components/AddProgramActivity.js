import React from "react";
import { Query, Mutation } from "react-apollo";

import {
  GET_PROGRAM_ACTIVITIES,
  GET_USER_ACTIVITIES,
  ADD_ACTIVITY_TO_PROGRAM,
} from "../Queries/programActivities";

export const AddProgramActivity = ({ programActivities, programId }) => {
  const addSetToProgram = (setId, addProgramSet) => {
    addProgramSet({
      variables: { setId, programId },
    })
      .then(() => {
        console.log("done");
      })
      .catch(e => console.log(e));
  };

  return (
    <Query query={GET_USER_ACTIVITIES}>
      {({ loading, error, data }) => {
        const { activities } = data;
        const currentActivityIds = programActivities.map(
          programActivity => programActivity.activity.id
        );
        if (loading) return <h2>Loading... </h2>;
        if (error) return `Error fetching activities`;

        // filter users sets to exclude ones included in this program already
        const availableActivities = activities.filter(
          f => !currentActivityIds.includes(f.id)
        );

        return (
          <Mutation
            mutation={ADD_ACTIVITY_TO_PROGRAM}
            refetchQueries={[
              { query: GET_PROGRAM_ACTIVITIES, variables: { id: programId } },
            ]}
          >
            {addProgramActivity => (
              <div>
                <ul>
                  {availableActivities.map(activity => (
                    <li
                      key={activity.id}
                      onClick={() =>
                        addSetToProgram(activity.id, addProgramActivity)
                      }
                    >
                      {activity.name}{" "}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Mutation>
        );
      }}
    </Query>
  );
};
