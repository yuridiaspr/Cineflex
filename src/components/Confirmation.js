import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function RepresentSeatName(Number) {
  if (parseInt(Number) < 10) {
    return (Number = "0" + Number);
  }
  return Number;
}

export default function Confirmation({
  Data,
  SelectedSeats,
  CustomerName,
  CPFCustomer,
}) {
  const navigate = useNavigate();

  function GoHome() {
    navigate("/");
  }
  return (
    <>
      <StyledHeaderConfirmation>
        Pedido feito com sucesso!
      </StyledHeaderConfirmation>

      <StyledConfirmationContainer data-identifier="movie-session-infos-reserve-finished">
        <h1>Filme e sessão</h1>
        <h2>{Data.movie.title}</h2>
        <h2>
          {Data.day.date} {Data.name}
        </h2>
      </StyledConfirmationContainer>

      <StyledConfirmationContainer data-identifier="seat-infos-reserve-finished">
        <h1>Ingressos</h1>
        {SelectedSeats.map((seats) => (
          <h2>Assento {RepresentSeatName(seats.name)}</h2>
        ))}
      </StyledConfirmationContainer>

      <StyledConfirmationContainer data-identifier="buyer-infos-reserve-finished">
        <h1>Comprador</h1>
        <h2>Nome: {CustomerName}</h2>
        <h2>CPF: {CPFCustomer}</h2>
      </StyledConfirmationContainer>
      <StyledGoHome>
        <StyledButtonGoHome
          data-identifier="back-to-home-btn"
          onClick={() => GoHome()}
        >
          Voltar pra Home
        </StyledButtonGoHome>
      </StyledGoHome>
    </>
  );
}

const StyledHeaderConfirmation = styled.div`
  font-family: "Roboto", sans-serif;
  font-size: 24px;
  font-weight: 700;
  line-height: 28px;
  letter-spacing: 0.04em;
  text-align: center;
  margin-top: 67px;
  padding: 55px 90px;
  color: #247a6b;
`;

const StyledConfirmationContainer = styled.div`
  margin-left: 28px;
  margin-bottom: 30px;

  h1 {
    font-family: "Roboto", sans-serif;
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 28px;
    display: flex;
    align-items: center;
    letter-spacing: 0.04em;

    color: #293845;
  }
  h2 {
    font-family: "Roboto", sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 22px;
    line-height: 26px;
    display: flex;
    align-items: center;
    letter-spacing: 0.04em;

    color: #293845;
  }
`;

const StyledGoHome = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
`;

const StyledButtonGoHome = styled.button`
  margin-top: 50px;

  width: 225px;
  height: 42px;

  background: #e8833a;
  border-radius: 3px;

  display: flex;
  justify-content: center;

  font-family: "Roboto", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 21px;
  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: 0.04em;
  text-decoration: none;

  color: #ffffff;

  border: none;

  Link {
    text-decoration: none;
  }
`;
