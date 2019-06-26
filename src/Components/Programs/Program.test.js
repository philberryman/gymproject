import React from "react";
import { MockedProvider } from "react-apollo/test-utils";
import { MemoryRouter } from "react-router";
import { render, waitForElement } from "react-testing-library";

import "jest-dom/extend-expect";

import { Program } from "./Program";
import {
  GET_PROGRAM_ACTIVITIES,
  GET_USER_ACTIVITIES,
} from "../../Queries/programActivities";

import {
  mockProgramActivities,
  mockUserActivities,
} from "../../Tests/mockResponses/mockProgramActivities";

// Mock graphql response

const componentElements = async () => {
  const utils = render(
    <MockedProvider
      mocks={[
        {
          request: { query: GET_PROGRAM_ACTIVITIES, variables: { id: 1 } },
          result: mockProgramActivities,
        },
        {
          request: { query: GET_USER_ACTIVITIES },
          result: mockUserActivities,
        },
      ]}
      addTypename={false}
    >
      <MemoryRouter>
        <Program match={{ params: { id: 1 } }} />
      </MemoryRouter>
    </MockedProvider>
  );

  await waitForElement(() => utils.getByText(/Activity 1/i));

  return {
    activityLink: utils.getByText(/Activity 1/i),
  };
};

beforeEach(() => window.history.pushState({}, "Test Title", "/programs/1"));

it("should render without error", async () => {
  const { activityLink } = await componentElements();

  expect(activityLink).toBeTruthy();
});
