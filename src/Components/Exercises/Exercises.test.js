import React from "react";
import { MockedProvider } from "react-apollo/test-utils";
import { MemoryRouter } from "react-router";
import { render, waitForElement } from "react-testing-library";

import "jest-dom/extend-expect";

import { AllExercises } from "./AllExercises";
import { GET_EXERCISES } from "../../Queries/exercises";
import { mockExercises } from "../../Tests/mockResponses/mockExercises";

const componentElements = async () => {
  const utils = render(
    <MockedProvider
      mocks={[{ request: { query: GET_EXERCISES }, result: mockExercises }]}
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
    exerciseDescription: utils.getByTest(/Exercise 1 description/i),
  };
};

describe("All Exercise list", () => {
  it("should render without error", async () => {
    const { exerciseLink, exerciseDescription } = await componentElements();
    expect(exerciseLink).toBeTruthy();
    expect(exerciseDescription).toBeTruthy();
  });
});
