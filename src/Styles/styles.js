import styled from "styled-components";

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

export const HomeContainer = styled.div`
  padding: 25px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
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

export const Logo = styled.div`
  border: 1px solid #d6cfcf;
  background: #eee9e9;
  padding: 0 0 0 0;
  width: 195px;
  height: 35px;
`;

export const LogoText = styled.div`
    padding: 3px 0 0 0
  margin: auto;
`;

export const Menu = styled.div`
  vertical-align: middle;
`;
