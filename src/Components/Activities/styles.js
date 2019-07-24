import styled from "styled-components";
import { Link } from "react-router-dom";

const getTheme = themeProp => (...styleProps) => props =>
  styleProps.map(prop => props.theme[themeProp][prop]).join(" ");

const color = getTheme("colors");
const size = getTheme("sizes");
const fontSize = getTheme("fontSizes");

export const FormInputs = styled.div`
  display: flex;
  flex-direction: row;
  margin: 5px;
`;

export const InputLarge = styled.input`
  padding: ${size("small1")} 0 ${size("small1")} ${size("small1")}
  margin: 0px;
  width: ${size("small5")}
  height: ${size("small2")}
  border: 1px solid;
`;

export const InputSmall = styled.input`
  padding: ${size("small1")}
  margin: 0px;
  width: ${size("small3")}
  height: ${size("small2")}
  border: 1px solid;
`;

export const InputLabel = styled.div`
  padding: 0 ${size("small3")} ${size("small1")} ${size("small1")};
  margin: 0px;
  width: 20px;
  height: 10px;
  font-size: ${fontSize("small1")};
`;

export const Card = styled.div`
  padding: 0;
  margin: 0 0 ${size("small2")} 0;
  border-radius: ${size("small2")};
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.25);
  background: ${color("grey1")};
`;

export const ListDivider = styled.div`
  width: 100% - ${size("small5")} * 2;
  height: 1px;
  margin: 0 ${size("small5")};
  background: ${color("grey8")};
`;

export const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 ${size("small2")};
  min-height: 29px;
  min-width: 300px;
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

export const CardHeader = styled.div``;

export const ActivityName = styled.div``;

export const ActivityExerciseSub = styled.div`
  font-size: ${fontSize("small1")};
  margin: ${size("small2")} 0 ${size("small1")} 0;
`;

export const ActivityInputs = styled.div``;
