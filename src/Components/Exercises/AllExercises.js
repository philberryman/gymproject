import React from "react";
import { Query } from "react-apollo";

import { GET_EXERCISES } from "./queries";

import {
  CenteredContainer,
  UnstyledList,
  ProgramListItem,
  UnStyledLink,
  SmallButton,
  ButtonGroup,
  SubHeader,
} from "../../Styles/styles.js";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export const AllExercises = props => {
  return (
    <Query query={GET_EXERCISES}>
      {({ loading, error, data }) => {
        if (loading)
          return (
            <h2>
              Loading...ZZ{" "}
              <FontAwesomeIcon
                icon={faSpinner}
                style={{ color: "blue" }}
                spin
              />
            </h2>
          );
        if (error) return `Error! fetching todos.`;
        if (data.exercises.length === 0)
          return (
            <div>
              <h3>No Exercises Created Yet</h3>
            </div>
          );

        return (
          <>
            <SubHeader> &lt; back</SubHeader>
            <SubHeader>All Exercises</SubHeader>
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
                        View
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
  );
};
