import React from "react";
import { Query } from "react-apollo";
import { Link } from "react-router-dom";

import { GET_PROGRAMS } from "./queries";

import { AddProgram } from "./AddProgram";
import {
  ProgramList,
  ProgramListItem,
  ProgramListDivider,
  UnStyledLink,
  SmallButton,
  ButtonGroup,
  ProgramsHeader,
} from "./styles.js";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export const AllPrograms = (auth, ...props) => {
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
            <ProgramList>
              <ProgramsHeader>Your Programs</ProgramsHeader>

              {data.programs.map(program => (
                <React.Fragment key={program.id}>
                  <ProgramListItem>
                    <UnStyledLink to={`/programs/${program.id}`}>
                      {program.name}
                    </UnStyledLink>
                    <ButtonGroup>
                      <Link to={`/programs/${program.id}`}>
                        <SmallButton>View</SmallButton>
                      </Link>
                    </ButtonGroup>
                  </ProgramListItem>
                  {program.id !==
                    data.programs[data.programs.length - 1].id && (
                    <ProgramListDivider />
                  )}
                </React.Fragment>
              ))}
            </ProgramList>
          </>
        );
      }}
    </Query>
  );
};
