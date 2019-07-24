import styled from "styled-components";
import { Link } from "react-router-dom";

const getTheme = themeProp => (...styleProps) => props =>
  styleProps.map(prop => props.theme[themeProp][prop]).join(" ");

const color = getTheme("colors");
const size = getTheme("sizes");

export const SubHeader = styled.h2`
  font-family: Helvetica Neue;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 22px;
  letter-spacing: 0.05em;
  color: ${color("grey6")};
  padding: ${size("small4")} 0;
  margin: 0;
`;

export const ListHeader = styled.li`
  font-family: Helvetica Neue;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 22px;
  letter-spacing: 0.05em;
  color: ${color("grey8")};
  border-radius: ${size("small2")} ${size("small2")} 0 0;
  background: #ffffff;
  padding: ${size("small4")} ${size("small4")};
  margin: 0;
`;

export const CenteredContainer = styled.div`
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const UnstyledList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const UnStyledLink = styled(Link)`
  font-size: ${size("small4")};
  text-decoration: none;
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
    color: ${color("grey7")};
  }
  min-height: ${size("small4")};
`;

export const ListWithHeader = styled.ul`
  list-style: none;
  padding: 0 0 ${size("small1")}; 0;
  margin: 0;
  border-radius: ${size("small2")};
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.25);
  background: ${color("grey1")};
`;

export const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  padding: ${size("small3")} ${size("small5")};
  width: 85vw;
  min-height: ${size("medium2")};
  margin: 0;
  background: ${color("grey1")};
  box-sizing: border-box;
  font-family: Helvetica Neue;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 24px;
  letter-spacing: 0.05em;
  align-items: flex-start;
`;

export const ListDivider = styled.li`
  width: 100% - ${size("small5")} * 2;
  height: 1px;
  margin: 0 ${size("small5")};
  background: ${color("grey8")};
`;

export const ButtonGroup = styled.div`
  display: flex;
`;

export const SmallButton = styled.button`
  padding: 0;
  margin: 0 0 0 0;
  background: ${color("grey1")};
  border: 1px solid ${color("grey7")};
  border-radius: ${size("small2")};
  width: 55px;
  height: ${size("small5")};
  font-family: Helvetica Neue;
  font-style: normal;
  font-weight: bold;
  font-size: 10px;
  line-height: ${size("small5")};
  text-decoration: none;
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
    color: #000000;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const Input = styled.input`
  padding: 10px 0;
  margin: 10px;
`;
