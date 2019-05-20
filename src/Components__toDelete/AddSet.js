import React from "react";
import { Query, Mutation } from "react-apollo";

import { GET_USER_SETS, ADD_SET_TO_PROGRAM, getProgramSets } from "../queries";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const updateCache = (cache, { data }) => {
  console.log(data, cache);
};

export const AddSet = ({ programSets, programId }) => {
  console.log(programSets);

  console.log(programId);
  const addSetToProgram = (setId, addProgramSet) => {
    console.log(addProgramSet);
    console.log(setId);
    console.log(programId);
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
        console.log(programSets);
        const currentSetIds = programSets.map(item => item.user_set.id);
        console.log(currentSetIds);

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
        const availableSets = data.user_sets.filter(
          f => !currentSetIds.includes(f.id)
        );

        {
          /* <Mutation
    mutation={ADD_TODO}
    update={(cache, { data: { addTodo } }) => {
      const { todos } = client.readQuery({ query: TODOS });
      client.writeQuery({
        query: TODOS,
        variables: { setId, programId },
        data: { todos: todos.concat([addTodo]) }
      });
    }}
  >. */
        }

        return (
          <Mutation
            mutation={ADD_SET_TO_PROGRAM}
            refetchQueries={[
              { query: getProgramSets, variables: { id: programId } },
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
