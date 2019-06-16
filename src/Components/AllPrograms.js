import React from "react";
import { Query } from "react-apollo";

import { GET_PROGRAMS } from "../Queries/programs";

import { AddProgram } from "./AddProgram";
import {
  CenteredContainer,
  UnstyledList,
  ProgramListItem,
  UnStyledLink,
  SmallButton,
  ButtonGroup,
  SubHeader,
} from "../Styles/styles.js";

import { ListGroup, ListGroupItem } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export const AllPrograms = props => {
  return (
    <Query query={GET_PROGRAMS}>
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
        if (data.programs.length === 0)
          return (
            <div>
              <h3>No Programs Created Yet</h3>
              <AddProgram />
            </div>
          );

        return (
          <>
            <SubHeader> &lt; back</SubHeader>
            <SubHeader>Your Programs</SubHeader>
            <CenteredContainer>
              <UnstyledList>
                {data.programs.map(program => (
                  <ProgramListItem key={program.id}>
                    <UnStyledLink to={`/programs/${program.id}`}>
                      {program.name}
                    </UnStyledLink>
                    <ButtonGroup>
                      <SmallButton
                        background="#EB7191"
                        to={`/programs/${program.id}`}
                      >
                        View
                      </SmallButton>
                    </ButtonGroup>
                  </ProgramListItem>
                ))}
              </UnstyledList>
              <ListGroup>
                <ListGroupItem>
                  <AddProgram />
                </ListGroupItem>
              </ListGroup>
            </CenteredContainer>
          </>
        );
      }}
    </Query>
  );
};
