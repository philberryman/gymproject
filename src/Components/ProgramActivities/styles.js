import styled from "styled-components";
import { Link } from "react-router-dom";

const getTheme = themeProp => (...styleProps) => props =>
  styleProps.map(prop => props.theme[themeProp][prop]).join(" ");

const color = getTheme("colors");
const size = getTheme("sizes");

export const WholeScreen = styled.div`
  height: 100%;
  width: 100vw;
  background: ${color("grey2")};
`;

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

export const SubHeader = styled.h2`
  font-family: Helvetica Neue;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 22px;
  letter-spacing: 0.05em;
  color: #fffdfd;
  padding: 0;
  margin: 0 0 ${size("small3")} 0;
`;

export const MainContainer = styled.div`
  margin: 45px ${size("small3")} ${size("small3")} ${size("small3")};
  padding: 0 10px 10px 10px;
  border: 0;
  box-sizing: border-box;
  flex-grow: 1;
`;

export const CenteredContainer = styled.div`
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const UnstyledList = styled.ul`
  list-style: none;
  width: 85vw;
  padding: 0;
  margin: 0;
`;

export const ProgramList = styled.ul`
  list-style: none;
  padding: 0 0 0 0;
  margin: 0 0 ${size("small2")} 0;
  border-radius: ${size("small2")};
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.25);
  background: ${color("grey1")};
`;

export const ProgramListItem = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 5px 0 5px 10px;
  width: 85vw;
  min-height: 29px;
  margin: 10px 0 0 0;
  background: #f9f7f7;
  border: 1px solid #f4f4f4;
  box-sizing: border-box;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  font-family: Helvetica Neue;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 24px;
  letter-spacing: 0.05em;
  color: #757070;
`;

export const ActivityItem = styled.li`
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

export const ActivityHeader = styled.li`
  display: flex;
  flex-direction: row;
  font-family: Helvetica Neue;
  font-style: normal;
  font-weight: bold;
  font-size: ${size("small4")}
  line-height: 22px;
  letter-spacing: 0.05em;
  color: ${color("grey6")};
  border-radius: ${size("small2")};
  background: #ffffff;
  padding: ${size("small4")} ${size("small4")};
  margin: 0;
`;

export const ActivityName = styled.span`
  margin: 0;
  padding: 0;
`;

export const OpenClose = styled.div`
  margin: 0;
  padding: 0;
`;

export const ActivitySetList = styled.ul`
  border: 1px solid #d1cfcf;
  border-width: 1px 0 0 0;
  list-style: none;
  padding: 0;
  margin: 5px 0;
`;

export const ActivitySetItem = styled.li`
  display: flex;
  justify-content: space-between;
  padding: ${size("small3")} ${size("small5")};
  width: 85vw;
  min-height: ${size("medium2")};
  margin: 0;
  background: ${props => (props.open ? color("grey8") : color("grey1"))};
  box-sizing: border-box;
  font-family: Helvetica Neue;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 24px;
  letter-spacing: 0.05em;
  align-items: flex-start;
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

export const SmallButton = styled(Link)`
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
  border: 0px
  background: ${color("grey3")};
  padding: 15px;
  width: 195px;
  height: 18px;
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
  padding: 15px;
`;

export const DarkHeader = styled.h1`
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

export const HeaderLabel = styled.div`
  width: 50px;
`;

export const UpDownArrow = styled.div`
  color: #ffffff;
  text-align: center;
  padding: 3px 0;
`;

export const ActivityValue = styled.div`
  color: ${props => (props.open ? "#FFFFFF" : "#000000")};
  font-size: 12px;
  width: 55px;
  height: 20px;
  line-height: 20px;
  text-align: center;
`;

export const DoneDelete = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: stretch;
  justify-content: space-between;
`;

export const AddSetLink = styled.div`
  font-size: 12px;
  width: 55px;
  height: 20px;
`;

export const ActivityOrderButtons = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: stretch;
  justify-content: space-between;
  width: 55px;
`;

export const ActivityOrderUpDown = styled.div`
  font-size: 12px;
  width: 10px;
  height: 20px;
`;
