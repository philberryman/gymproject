import React from "react";
import { MockedProvider } from "react-apollo/test-utils";
import { Route, Router, MemoryRouter } from "react-router-dom";
import { render, waitForElement } from "react-testing-library";
import { createMemoryHistory } from "history";
import { theme } from "../Theme/index.js";
import { ThemeProvider } from "styled-components";

import "jest-dom/extend-expect";

import { ProgramActivities } from "../Components/ProgramActivities/ProgramActivities";
import {
  GET_PROGRAM_ACTIVITIES,
  GET_USER_ACTIVITIES,
} from "../Components/ProgramActivities/queries";

import {
  mockProgramActivities,
  mockUserActivities,
} from "./mockResponses/mockProgramActivities";

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
        <ThemeProvider theme={theme}>
          <ProgramActivities />
        </ThemeProvider>
      </MemoryRouter>
    </MockedProvider>
  );

  await waitForElement(() => utils.getByText(/Activity 1/i));

  return {
    activityLink: utils.getByText(/Activity 1/i),
  };
};

beforeEach(() => window.history.pushState({}, "Test Title", "/programs/1"));

test("renders without error", async () => {
  const { activityLink } = await componentElements();
  expect(activityLink).toBeTruthy();
});
