import React from "react";
import { MockedProvider } from "react-apollo/test-utils";
import { MemoryRouter } from "react-router";
import { render, waitForElement } from "react-testing-library";

import "jest-dom/extend-expect";

import { ProgramActivitySets } from "../Components/ProgramActivitySets";
import {
  GET_PROGRAM_ACTIVITIES,
  GET_USER_ACTIVITIES,
} from "../Queries/programActivities";

import {
  mockProgramActivities,
  mockUserActivities,
} from "./mockResponses/mockProgramActivities";

import { activitySets } from "./mockObjects/activitySetsArray";

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
        <ProgramActivitySets activitySets={activitySets} />
      </MemoryRouter>
    </MockedProvider>
  );

  await waitForElement(() => utils.getByText(/50 KGs/i));

  return {
    weight: utils.getByText(/50 KGs/i),
  };
};

beforeEach(() => window.history.pushState({}, "Test Title", "/programs/1"));

it("should render weight of set - 50 KGs", async () => {
  const { weight } = await componentElements();

  expect(weight).toBeTruthy();
});
