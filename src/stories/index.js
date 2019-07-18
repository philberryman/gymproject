import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";

import { Button, Welcome } from "@storybook/react/demo";
import { SmallButton } from "../Components/Programs/styles.js";
import {
  ProgramList,
  ProgramsHeader,
  ProgramListItem,
} from "../Components/Programs/styles.js";

import { MockedProvider } from "react-apollo/test-utils";
import { MemoryRouter } from "react-router";

import { Programs } from "../Components/Programs/Programs";
import { theme } from "../Theme/index.js";
import { ThemeProvider } from "styled-components";

import { GET_PROGRAMS } from "../Components/Programs/queries";
import { mockPrograms } from "../Tests/mockResponses/mockPrograms";

storiesOf("Welcome", module).add("to Storybook", () => (
  <Welcome showApp={linkTo("Button")} />
));

storiesOf("Button", module)
  .add("with text", () => (
    <Button onClick={action("clicked")}>Hello Button</Button>
  ))
  .add("with some emoji", () => (
    <Button onClick={action("clicked")}>
      <span role="img" aria-label="so cool">
        😀 😎 👍 💯
      </span>
    </Button>
  ))
  .add("SmallButton", () => <SmallButton>Small</SmallButton>);

storiesOf("Lists", module).add("List with header", () => (
  <ProgramList>
    <ProgramsHeader>A header</ProgramsHeader>
    <ProgramListItem>Item 1</ProgramListItem>
    <ProgramListItem>Item 2</ProgramListItem>
    <ProgramListItem>Item 3</ProgramListItem>
  </ProgramList>
));

storiesOf("Programs", module).add("List with header", () => (
  <MockedProvider
    mocks={[{ request: { query: GET_PROGRAMS }, result: mockPrograms }]}
    addTypename={false}
  >
    <MemoryRouter>
      <ThemeProvider theme={theme}>
        <Programs />
      </ThemeProvider>
    </MemoryRouter>
  </MockedProvider>
));
