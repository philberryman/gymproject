import React from "react";
import { Query, Mutation } from "react-apollo";

import {
  GET_PROGRAM_SETS,
  GET_USER_SETS,
  ADD_SET_TO_PROGRAM,
} from "../Queries/programSets";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export const AddProgramSet = ({ programSets, programId }) => {
  console.log(programId);
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
    <Query query={GET_USER_SETS}>
      {({ loading, error, data }) => {
        const currentSetIds = programSets.map(item => item.set.id);
        if (loading)
          return (
            <h2>
              Loading...{" "}
              <FontAwesomeIcon
                icon={faSpinner}
                style={{ color: "blue" }}
                spin
              />
            </h2>
          );
        if (error) return `Error! fetching todos.`;

        // filter users sets to exclude ones included in this program already
        const availableSets = data.sets.filter(
          f => !currentSetIds.includes(f.id)
        );

        return (
          <Mutation
            mutation={ADD_SET_TO_PROGRAM}
            refetchQueries={[
              { query: GET_PROGRAM_SETS, variables: { id: programId } },
            ]}
          >
            {addProgramSet => (
              <div>
                <ul>
                  {availableSets.map(set => (
                    <li
                      key={set.id}
                      onClick={() => addSetToProgram(set.id, addProgramSet)}
                    >
                      {set.name}{" "}
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
