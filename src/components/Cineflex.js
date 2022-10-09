import styled from "styled-components";
import colors from "../assets/css/colors";

export default function Cineflex() {
  return (
    <StyledScreenContainer>
      <p>CINEFLEX</p>
    </StyledScreenContainer>
  );
}

const StyledScreenContainer = styled.div`
  background-color: ${colors.GRAY};
  position: fixed;
  width: 100vw;
  height: 67px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px;
  padding: 0px;
  top: 0px;
  left: 0px;
  p {
    color: ${colors.ORANGE};
    font-family: "Roboto", sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 34px;
    line-height: 40px;
  }
`;
