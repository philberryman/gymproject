import React from "react";
import { MockedProvider } from "react-apollo/test-utils";
import { MemoryRouter } from "react-router";
import { render, waitForElement } from "react-testing-library";

import "jest-dom/extend-expect";
import { toBeTruthy } from "jest-dom";

import { AllExercises } from "../Components/AllExercises";
import { GET_EXERCISES } from "../Queries/exercises";

// Mock graphql response
const mockData = {
  data: {
    exercises: [
      {
        id: 1,
        name: "Exercise 1",
        description: "Mock Exercise 1",
      },
      {
        id: 2,
        name: "Seated Shoulder Press - Dumb Bell",
        description: "blah",
      },
    ],
  },
};

const componentElements = async () => {
  const utils = render(
    <MockedProvider
      mocks={[{ request: { query: GET_EXERCISES }, result: mockData }]}
      addTypename={false}
    >
      <MemoryRouter>
        <AllExercises />
      </MemoryRouter>
    </MockedProvider>
  );

  await waitForElement(() => utils.getByText(/Exercise 1/i));

  return {
    exerciseLink: utils.getByText(/Exercise 1/i),
    submitButton: utils.getByText(/Submit/),
    programNameInput: utils.getByPlaceholderText(/exercise name/),
  };
};

it("should render without error", async () => {
  const {
    exerciseLink,
    submitButton,
    programNameInput,
  } = await componentElements();

  expect(exerciseLink).toBeTruthy();
  expect(submitButton).toBeTruthy();
  expect(programNameInput).toBeTruthy();
});

// it("submit is disabled when input box is empty", async () => {});

// it("submit is enabled when input box has text", async () => {});
