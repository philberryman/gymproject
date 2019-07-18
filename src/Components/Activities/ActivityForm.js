import React, { useState } from "react";
import { GET_EXERCISES } from "../Exercises/queries";
import { GET_ACTIVITIES } from "./queries";
import { Query } from "react-apollo";

import {
  CenteredContainer,
  UnstyledList,
  ProgramListItem,
  UnStyledLink,
  SmallButton,
  ButtonGroup,
} from "../../Styles/styles.js";

export const ActivityForm = ({ onSubmit, history }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const primaryExerciseId = 1;
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        onSubmit({
          variables: { name, description, primaryExerciseId },
          refetchQueries: [{ query: GET_ACTIVITIES }],
        })
          .then(result => history.push(`/exercises/`))
          .catch(e => console.log(e));
      }}
    >
      <input
        onChange={e => setName(e.target.value)}
        type="text"
        placeholder="exercise name"
        value={name}
      />
      <input
        onChange={e => setDescription(e.target.value)}
        type="text"
        placeholder="exercise description"
        value={description}
      />
      <Query query={GET_EXERCISES}>
        {({ loading, error, data }) => {
          if (loading) return <h2>Loading exercises</h2>;
          if (error) return `Error! fetching exercises.`;
          if (data.exercises.length === 0)
            return (
              <div>
                <h3>No Exercises Created Yet</h3>
              </div>
            );
          return (
            <>
              <CenteredContainer>
                <UnstyledList>
                  {data.exercises.map(exercise => (
                    <ProgramListItem key={exercise.id}>
                      <UnStyledLink to={`/exercises/${exercise.id}`}>
                        {exercise.name}
                      </UnStyledLink>
                      <ButtonGroup>
                        <SmallButton
                          background="#EB7191"
                          to={`/programs/${exercise.id}`}
                        >
                          View d
                        </SmallButton>
                      </ButtonGroup>
                    </ProgramListItem>
                  ))}
                </UnstyledList>
              </CenteredContainer>
            </>
          );
        }}
      </Query>
      <button>Submit</button>
    </form>
  );
};
