import React from "react";

import { MainHeader, Logo, Menu, LogoText } from "./styles.js";
import menu from "../../assets/menu.svg";

export const Header = props => {
  return (
    <MainHeader>
      <Logo>
        <LogoText>GYM PROJECT!!</LogoText>
      </Logo>
      <Menu>
        <img src={menu} alt="menu" />
      </Menu>
    </MainHeader>
  );
};
