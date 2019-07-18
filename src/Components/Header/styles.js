import styled from "styled-components";
import { Link } from "react-router-dom";

const getTheme = themeProp => (...styleProps) => props =>
  styleProps.map(prop => props.theme[themeProp][prop]).join(" ");

const color = getTheme("colors");
const size = getTheme("sizes");

export const MainHeader = styled.div`
background: ${color("grey3")};
margin: 0;
  padding: 0px
  display: flex;
  justify-content: space-between;
  color: #FFFDFD;
  position:fixed;
  top: 0; /* Position the navbar at the top of the page */
  left:0;
  width: 100%;
`;

export const UnStyledLink = styled(Link)`
  text-decoration: none;
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
    color: #757070;
  }
`;

export const Logo = styled.div`
  border: 0px
  background: ${color("grey3")};
  padding: ${size("small3")}
  width: 195px;
  height: ${size("small4")}
`;

export const LogoText = styled.div`
  color: ${color("grey9")};
  padding: 0;
  margin: auto;
  font-family: Helvetica Neue;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 18px;
  text-align: left;
  letter-spacing: 0.05em;
`;

export const Menu = styled.div`
  vertical-align: middle;
  padding: ${size("small3")};
`;
