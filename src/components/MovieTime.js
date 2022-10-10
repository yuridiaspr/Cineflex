import colors from "../assets/css/colors";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import loading from "../assets/images/Loading_icon.gif";

export default function MovieTime() {
  const [SchedulesList, setSchedulesList] = useState(null);
  const { idFilme } = useParams();

  useEffect(() => {
    const request = axios.get(
      `https://mock-api.driven.com.br/api/v5/cineflex/movies/${idFilme}/showtimes`
    );
    request.then((response) => setSchedulesList(response.data));
  }, []);

  return (
    <>
      <StyledHeader>Selecione o horário</StyledHeader>

      {SchedulesList !== null ? (
        <>
          <StyledAllTimesAvailable>
            {SchedulesList.days.map((Schedule, ind) => (
              <StyledScheduleContainer identifier="session-date">
                <p>
                  {Schedule.weekday} - {Schedule.date}
                </p>
                <StyledScheduleContainerDiv>
                  {Schedule.showtimes.map((Time, ind) => (
                    <Link to={`/assentos/${Time.id}`}>
                      <button data-identifier="hour-minute-btn">
                        {Time.name}
                      </button>
                    </Link>
                  ))}
                </StyledScheduleContainerDiv>
              </StyledScheduleContainer>
            ))}
          </StyledAllTimesAvailable>
          <Styledfooter>
            <StyledFooterImageContainer>
              <img
                data-identifier="movie-img-preview"
                src={SchedulesList.posterURL}
              />
            </StyledFooterImageContainer>
            <p>{SchedulesList.title}</p>
          </Styledfooter>
        </>
      ) : (
        <img src={loading} />
      )}
    </>
  );
}

const StyledHeader = styled.div`
  font-family: "Roboto", sans-serif;
  font-size: 24px;
  font-weight: 400;
  line-height: 28px;
  letter-spacing: 0.04em;
  text-align: center;
  margin-top: 67px;
  padding: 55px 0px;
  color: ${colors.BLACK};
`;

const StyledAllTimesAvailable = styled.div`
  margin-bottom: 100px;
`;

const StyledScheduleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0px 24px 24px;
  > p{
    font-family: "Roboto", sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    display: flex;
    align-items: center;
    letter-spacing: 0.02em;
    margin-bottom: 22px;
    
    color: ${colors.BLACK};
`;

const StyledScheduleContainerDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 10px;
  button {
    font-family: "Roboto", sans-serif;
    font-size: 18px;
    font-weight: 400;
    line-height: 21px;
    letter-spacing: 0.02em;
    text-align: center;
    color: #FFFFFF;
    
    width: 83px;
    height: 43px;
  
    margin: 0px 8px 8px 0px;
  
    background: #E8833A;
    border-radius: 3px;
    border: none;
`;

const Styledfooter = styled.div`
  position: fixed;
  width: 100vw;
  height: 117px;
  display: flex;
  align-items: center;
  justify-content: start;
  background-color: blue;
  bottom: 0px;

  background: ${colors.GRAYTRANSPARENT};
  border: 1px solid ${colors.BORDERFOOTER};
  > p {
    font-family: "Roboto", sans-serif;
    font-size: 26px;
    font-weight: 400;
    line-height: 30px;
    letter-spacing: 0em;
    text-align: left;
    color: #293845;
`;

const StyledFooterImageContainer = styled.div`
  height: 89px;
  width: 64px;
  border-radius: 2px;
  display: flex;
  justify-content: center;
  align-items: center;

  background: #ffffff;
  margin-left: 10px;
  margin-right: 14px;
  > img{
    width: 48px;
    height: 72px;
`;
