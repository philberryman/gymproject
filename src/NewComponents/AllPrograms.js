import React from "react";
import { Query, Mutation } from "react-apollo";
import { Link } from "react-router-dom";

import { GET_PROGRAMS, DELETE_PROGRAM } from "../Queries/programs";

import { AddProgram } from "./AddProgram";
import {
  CenteredContainer,
  UnstyledList,
  ProgramListItem,
  UnStyledLink,
  SmallButton,
  ButtonGroup,
} from "../Styles/styles.js";

import { ListGroup, ListGroupItem, Grid, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export const onDelete = (programId, deleteProgram) => {
  console.log(programId);
  deleteProgram({
    variables: { programId },
  });
};

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
        let count = 0;
        return (
          <CenteredContainer>
            <UnstyledList>
              {data.programs.map(program => (
                <ProgramListItem key={program.id}>
                  <UnStyledLink to={`/programs/${program.id}`}>
                    {" "}
                    {program.name}
                  </UnStyledLink>
                  <ButtonGroup>
                    <SmallButton background="#9EB8E3">
                      <UnStyledLink to={`/programs/${program.id}`}>
                        View
                      </UnStyledLink>
                    </SmallButton>
                    <SmallButton background="#3DE27F">
                      <UnStyledLink to={`/programs/${program.id}`}>
                        Do
                      </UnStyledLink>
                    </SmallButton>
                  </ButtonGroup>

                  {/* <Mutation
                    mutation={DELETE_PROGRAM}
                    refetchQueries={[{ query: GET_PROGRAMS }]}
                  >
                    {deleteProgram => (
                      <button
                        onClick={() => onDelete(program.id, deleteProgram)}
                      >
                        x
                      </button>
                    )}
                  </Mutation> */}
                </ProgramListItem>
              ))}
            </UnstyledList>
            <ListGroup>
              <ListGroupItem>
                <AddProgram />
              </ListGroupItem>
            </ListGroup>
          </CenteredContainer>
        );
      }}
    </Query>
  );
};
