import React from "react";
import { MockedProvider } from "react-apollo/test-utils";
import { MemoryRouter } from "react-router";
import { render, waitForElement } from "react-testing-library";

import "jest-dom/extend-expect";

import { AllPrograms } from "./AllPrograms";
import { GET_PROGRAMS } from "../../Queries/programs";
import { mockPrograms } from "../../Tests/mockResponses/mockPrograms";

const componentElements = async () => {
  const utils = render(
    <MockedProvider
      mocks={[{ request: { query: GET_PROGRAMS }, result: mockPrograms }]}
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
    // submitButton: utils.getByText(/Submit/),
    // programNameInput: utils.getByPlaceholderText(/program name/),
  };
};

describe("All Programs list", () => {
  it("should render without error", async () => {
    const {
      programLink,
      // submitButton,
      // programNameInput,
    } = await componentElements();

    expect(programLink).toBeTruthy();
    // expect(submitButton).toBeTruthy();
    // expect(programNameInput).toBeTruthy();
  });
});

// it("submit is disabled when input box is empty", async () => {});

// it("submit is enabled when input box has text", async () => {});
