import styled from "styled-components";
import { Link } from "react-router-dom";

export const WholeScreen = styled.div`
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
  width: 100vw;
  background: #ffffff;
`;

export const MainHeader = styled.div`
  background: #f4f0f0;
  color: #000000;
  height:35px
  margin: 0;
  padding: 15px
  display: flex;
  justify-content: space-between;
  font-family: Helvetica Neue;
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  text-align: center;
`;

export const MainContainer = styled.div`
  height: calc(var(--vh, 1vh) * 100 - 105px);
  margin: 15px
  padding: 10px
  background: #f9f7f7;
  border: 1px solid #a3a1a1;
  box-sizing: border-box;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.25);
  flex-grow: 1;
`;

export const CenteredContainer = styled.div`
  padding: 25px 0;
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

export const ProgramListItem = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 5px 0 5px 10px;
  width: 85vw;
  min-height: 29px;
  margin: 10px 0 0 0;
  background: #ebebeb;
  border: 1px solid #d1cfcf;
  box-sizing: border-box;
  font-family: Helvetica Neue;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 12px;
  text-decoration: "none";
`;

export const ActivityItem = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 5px 0 5px 20px;
  width: 85vw;
  min-height: 29px;
  margin: 0;
  background: #c4c4c4;
  border: 1px solid #d1cfcf;
  border-width: 0 1px 1px 1px;

  box-sizing: border-box;
  font-family: Helvetica Neue;
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 12px;
  text-decoration: "none";
`;

export const ActivitySetItem = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 5px 0 5px 30px;
  width: 85vw;
  min-height: 29px;
  margin: 0;
  background: #c4c4c4;
  border: 1px solid #d1cfcf;
  border-width: 0 1px 1px 1px;

  box-sizing: border-box;
  font-family: Helvetica Neue;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 12px;
  text-decoration: "none";
`;

export const BigButton = styled.div`
  padding: 10px 0 0 0;
  margin: 0 0 25px 0;
  background: ${props => props.background || "palevioletred"};
  width: 230px;
  height: 40px;
  font-family: Helvetica Neue;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 29px;
  align-items: center;
  text-align: center;
  color: #000000;
`;

export const ButtonGroup = styled.div`
  display: flex;
`;

export const SmallButton = styled.div`
  padding: 2px 2px 1px 2px;
  margin: 0 5px 0 0
  background: ${props => props.background || "palevioletred"};
  border: 1px solid #9E9C9C;
  width: 35px;
  height: 15px;
  font-family: Helvetica Neue;
  font-style: normal;
  font-weight: bold;
  font-size: 10px;
  line-height: 15px;
  align-items: center;
  text-align: center;
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

export const Logo = styled.div`
  border: 1px solid #d6cfcf;
  background: #eee9e9;
  padding: 0 0 0 0;
  width: 195px;
  height: 35px;
`;

export const LogoText = styled.div`
  padding: 3px 0 0 0;
  margin: auto;
`;

export const Menu = styled.div`
  vertical-align: middle;
`;
