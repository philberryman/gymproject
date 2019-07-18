import React from "react";
import { MockedProvider } from "react-apollo/test-utils";
import { MemoryRouter } from "react-router";
import {
  render,
  waitForElement,
  cleanup,
  fireEvent,
  getByAltText,
} from "react-testing-library";

import "jest-dom/extend-expect";

import { ProgramActivitySets } from "../Components/ProgramActivities/ProgramActivitySets";
import { theme } from "../Theme/index.js";
import { ThemeProvider } from "styled-components";
import {
  GET_PROGRAM_ACTIVITIES,
  GET_USER_ACTIVITIES,
} from "../Components/ProgramActivities/queries";

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
        <ThemeProvider theme={theme}>
          <ProgramActivitySets activitySets={activitySets} />
        </ThemeProvider>
      </MemoryRouter>
    </MockedProvider>
  );

  await waitForElement(() => utils.getByText(/50 KGs/i));

  return utils;

  // {
  //   weight: utils.getByText(/50 KGs/i),
  //   reps: utils.getByText(/10 reps/i),
  //   sets: utils.getByText(/4 sets/i),
  // };
};

beforeEach(() => window.history.pushState({}, "Test Title", "/programs/1"));
afterEach(cleanup);

it("should show weight of 50kg", async () => {
  const utils = await componentElements();
  const weight = utils.getByText(/50 Kgs/i);
  expect(weight).toBeTruthy();
});

it("should show 10 reps", async () => {
  const utils = await componentElements();
  const reps = utils.getByText(/10 reps/i);
  expect(reps).toBeTruthy();
});

it("should show 4 sets", async () => {
  const utils = await componentElements();
  const sets = utils.getByText(/4 sets/i);
  expect(sets).toBeTruthy();
});

it("should show open to show edit controls when edit is clicked", async () => {
  const utils = await componentElements();
  const editOpened = fireEvent(
    utils.getByAltText("Edit"),
    new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
    })
  );
  const editWeight = await utils.getByAltText("increase weight");
  const editReps = await utils.getByAltText("increase reps");
  const editSets = await utils.getByAltText("increase sets");

  expect(editWeight).toBeTruthy();
  expect(editReps).toBeTruthy();
  expect(editSets).toBeTruthy();
});

it("should close show edit controls when done is clicked", async () => {
  const utils = await componentElements();
  fireEvent(
    utils.getByAltText("Edit"),
    new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
    })
  );
  await utils.getByAltText("increase weight");
  fireEvent(
    utils.getByAltText("Done"),
    new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
    })
  );
  expect(utils.queryByAltText("increase weight")).toBeNull();
});
