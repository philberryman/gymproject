import React from "react";
import { MockedProvider } from "react-apollo/test-utils";
import { MemoryRouter } from "react-router";
import { render, waitForElement } from "react-testing-library";

import "jest-dom/extend-expect";
import { toBeTruthy } from "jest-dom";

import { AllPrograms } from "../NewComponents/AllPrograms";
import { GET_PROGRAMS } from "../Queries/programs";

// Mock graphql response
const mockData = {
  data: {
    programs: [
      {
        id: 1,
        name: "Program 1",
      },
      {
        id: 2,
        name: "Program 2",
      },
    ],
  },
};

const componentElements = async () => {
  const utils = render(
    <MockedProvider
      mocks={[{ request: { query: GET_PROGRAMS }, result: mockData }]}
      addTypename={false}
    >
      <MemoryRouter>
        <AllPrograms />
      </MemoryRouter>
    </MockedProvider>
  );

  await waitForElement(() => utils.getByText(/Program 1/i));

  return {
    programLink: utils.getByText(/Program 1/i),
    submitButton: utils.getByText(/Submit/),
    programNameInput: utils.getByPlaceholderText(/program name/),
  };
};

it("should render without error", async () => {
  const {
    programLink,
    submitButton,
    programNameInput,
  } = await componentElements();

  expect(programLink).toBeTruthy();
  expect(submitButton).toBeTruthy();
  expect(programNameInput).toBeTruthy();
});

// it("submit is disabled when input box is empty", async () => {});

// it("submit is enabled when input box has text", async () => {});
