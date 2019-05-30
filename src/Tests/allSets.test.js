import React from "react";
import { MockedProvider } from "react-apollo/test-utils";
import { MemoryRouter } from "react-router";
import { render, waitForElement } from "react-testing-library";

import "jest-dom/extend-expect";
import { toBeTruthy } from "jest-dom";

import { AllSets } from "../NewComponents/AllSets";
import { GET_SETS } from "../Queries/sets";

// Mock graphql response
const mockData = {
  data: {
    sets: [
      {
        id: 1,
        name: "Set 1",
        description: "a mock set",
      },
      {
        id: 2,
        name: "Squats",
        description: "blah",
      },
    ],
  },
};

const componentElements = async () => {
  const utils = render(
    <MockedProvider
      mocks={[{ request: { query: GET_SETS }, result: mockData }]}
      addTypename={false}
    >
      <MemoryRouter>
        <AllSets />
      </MemoryRouter>
    </MockedProvider>
  );

  await waitForElement(() => utils.getByText(/Set 1/i));

  return {
    setLink: utils.getByText(/Set 1/i),
    submitButton: utils.getByText(/Submit/),
    setNameInput: utils.getByPlaceholderText(/set name/),
  };
};

it("should render without error", async () => {
  const { setLink, submitButton, setNameInput } = await componentElements();

  expect(setLink).toBeTruthy();
  expect(submitButton).toBeTruthy();
  expect(setNameInput).toBeTruthy();
});

// it("submit is disabled when input box is empty", async () => {});

// it("submit is enabled when input box has text", async () => {});
