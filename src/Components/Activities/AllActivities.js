import React from "react";
import { Query } from "react-apollo";

import { GET_ACTIVITIES } from "./queries";

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

export const AllActivities = props => {
  return (
    <Query query={GET_ACTIVITIES}>
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
        if (data.activities.length === 0)
          return (
            <div>
              <h3>No Exercises Created Yet</h3>
            </div>
          );

        return (
          <>
            <SubHeader> &lt; back</SubHeader>
            <SubHeader>All Activities</SubHeader>
            <CenteredContainer>
              <UnstyledList>
                {data.activities.map(activity => (
                  <ProgramListItem key={activity.id}>
                    <UnStyledLink to={`/activities/${activity.id}`}>
                      {activity.name}
                    </UnStyledLink>
                    <ButtonGroup>
                      <SmallButton
                        background="#EB7191"
                        to={`/activities/${activity.id}`}
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
