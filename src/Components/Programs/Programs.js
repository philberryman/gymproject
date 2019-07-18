import React from "react";

import { AllPrograms } from "./AllPrograms";
import { CenteredContainer, SubHeader } from "./styles.js";

export const Programs = (auth, props) => {
  return (
    <>
      <SubHeader> &lt; back</SubHeader>
      <CenteredContainer>
        <AllPrograms auth={auth} props={props} />
      </CenteredContainer>
    </>
  );
};
