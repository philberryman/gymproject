import React from "react";

import { render, fireEvent } from "react-testing-library";
import { MockedProvider } from "react-apollo/test-utils";

import "jest-dom/extend-expect";

import { CreateExercise } from "./CreateExercise";

it("should render without error", async () => {
  const { getByText, getByPlaceholderText } = render(
    <MockedProvider>
      <CreateExercise text="Hello!" />
    </MockedProvider>
  );

  const nameInput = getByPlaceholderText("exercise name");
  nameInput.value = "new exercise name";
  const descriptionInput = getByPlaceholderText("exercise description");
  descriptionInput.value = "new exercise description";
  //   fireEvent.change(input);

  expect(getByText("New Exercise")).toBeTruthy();
  expect(getByPlaceholderText("exercise name").value).toEqual(
    "new exercise name"
  );
  expect(getByPlaceholderText("exercise description").value).toEqual(
    "new exercise description"
  );
});
