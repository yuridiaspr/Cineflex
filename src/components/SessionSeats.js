import colors from "../assets/css/colors";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import loading from "../assets/images/Loading_icon.gif";

function RepresentSeatName(Number) {
  if (parseInt(Number) < 10) {
    return (Number = "0" + Number);
  }
  return Number;
}

function RepresentSeatColor(isAvailable, Selected) {
  if (Selected === true) {
    return "Selected";
  }
  if (isAvailable === true) {
    return "Available";
  } else {
    return "Unavailable";
  }
}

export default function SessionSeats({
  Data,
  setData,
  SelectedSeats,
  setSelectedSeats,
  CustomerName,
  setCustomerName,
  CPFCustomer,
  setCPFCustomer,
}) {
  const { idSessao } = useParams();
  const navigate = useNavigate();

  function submitData(event) {
    event.preventDefault();
    event.stopPropagation();

    const ids = [];
    SelectedSeats.map((c) => ids.push(c.id));
    const requestPost = axios.post(
      "https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many",
      {
        ids: ids,
        name: { CustomerName },
        cpf: { CPFCustomer },
      }
    );
    navigate("/sucesso");
  }

  function SelectSeat(seat) {
    if (seat.isAvailable === false) {
      alert("Esse assento não está disponível");
      return;
    }
    seat.selected = !seat.selected;

    if (!seat.selected) {
      const filteredSeats = SelectedSeats.filter((s) => !(s.id === seat.id));
      setSelectedSeats([...filteredSeats]);
      return;
    }
    setSelectedSeats([...SelectedSeats, seat]);
    return;
  }

  const [SeatList, setSeatList] = useState(null);

  useEffect(() => {
    const request = axios.get(
      `https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${idSessao}/seats`
    );
    request.then((response) => setData(response.data));
    request.then((response) => setSeatList(response.data.seats));
  }, []);

  return (
    <>
      {Data && SeatList !== null ? (
        <>
          <StyledHeader>Selecione o(s) assento(s)</StyledHeader>
          <StyledSeats data-identifier="seat">
            {SeatList.map((seat, ind) => (
              <button
                onClick={() => SelectSeat(seat)}
                className={RepresentSeatColor(seat.isAvailable, seat.selected)}
              >
                {RepresentSeatName(seat.name)}
              </button>
            ))}
          </StyledSeats>
          <StyledSubtitle>
            <div>
              <button></button>
              <p data-identifier="seat-selected-subtitle">Selecionado</p>
            </div>
            <div>
              <button></button>
              <p data-identifier="seat-available-subtitle">Disponível</p>
            </div>
            <div>
              <button></button>
              <p data-identifier="seat-unavailable-subtitle">Indisponível</p>
            </div>
          </StyledSubtitle>
          <StyledCustomerForm>
            <form onSubmit={submitData}>
              <label htmlFor="nome">Nome do comprador:</label>
              <input
                data-identifier="buyer-name-input"
                type="text"
                id="nome"
                placeholder="Digite seu nome"
                onChange={(e) => setCustomerName(e.target.value)}
                required
              ></input>
              <label htmlFor="cpf">CPF do comprador:</label>
              <input
                data-identifier="buyer-cpf-input"
                type="text"
                id="cpf"
                pattern="[0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}"
                placeholder="Digite seu CPF (xxx.xxx.xxx-xx)"
                onChange={(e) => setCPFCustomer(e.target.value)}
                required
              ></input>
              <div>
                <StyledButton
                  data-identifier="reservation-btn"
                  className="CustomerFormButton"
                  type="submit"
                >
                  Reservar assento(s)
                </StyledButton>
              </div>
            </form>
          </StyledCustomerForm>
          <StyledFooter>
            <div>
              <img
                data-identifier="movie-img-preview"
                src={Data.movie.posterURL}
              />
            </div>
            <div data-identifier="movie-and-session-infos-preview">
              <p>{Data.movie.title}</p>
              <p>
                {Data.day.weekday} - {Data.name}
              </p>
            </div>
          </StyledFooter>
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
  padding: 55px 0px 25px 0px;
  color: ${colors.BLACK};
`;

const StyledSeats = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-left: 21.5px;
  margin-right: 21.5px;
  button {
    width: 26px;
    height: 26px;

    border-radius: 12px;

    margin: 0px 3.5px 18px;

    font-family: "Roboto", sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 11px;
    line-height: 13px;
    display: flex;
    align-items: center;
    text-align: center;
    letter-spacing: 0.04em;

    color: ${colors.FULLBLACK};
  }
`;

const StyledSubtitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 41px;
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0px 17px;
    p {
      font-family: "Roboto", sans-serif;
      font-style: normal;
      font-weight: 400;
      font-size: 13px;
      line-height: 15px;
      display: flex;
      align-items: center;
      letter-spacing: -0.013em;

      color: #4e5a65;
    }
  }
  div:nth-child(1) > button {
    background: #1aae9e;
    border: 1px solid #0e7d71;
    width: 25px;
    height: 25px;

    border-radius: 12px;
  }
  div:nth-child(2) > button {
    background: #c3cfd9;
    border: 1px solid #808f9d;
    width: 25px;
    height: 25px;

    border-radius: 12px;
  }
  div:nth-child(3) > button {
    background: #fbe192;
    border: 1px solid #f7c52b;
    width: 25px;
    height: 25px;

    border-radius: 12px;
  }
`;

const StyledCustomerForm = styled.div`
  form {
    display: flex;
    flex-direction: column;
    margin: 0px 24px;
  }
  label {
    font-family: "Roboto", sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 21px;
    display: flex;
    align-items: center;

    color: #293845;
  }
  input {
    background: #ffffff;
    border: 1px solid #d5d5d5;
    border-radius: 3px;
    height: 51px;

    font-family: "Roboto", sans-serif;
    font-size: 18px;
    font-style: italic;
    font-weight: 400;
    line-height: 21px;
    letter-spacing: 0em;
    text-align: left;
    margin-bottom: 10px;
  }
  div {
    display: flex;
    justify-content: center;
    margin-bottom: 150px;
  }
`;

const StyledButton = styled.button`
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
`;

const StyledFooter = styled.div`
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

  div:nth-child(1) {
    height: 89px;
    width: 64px;
    border-radius: 2px;
    display: flex;
    justify-content: center;
    align-items: center;

    background: #ffffff;
    margin-left: 10px;
    margin-right: 14px;
  }

  img {
    width: 48px;
    height: 72px;
  }
  p {
    font-family: "Roboto", sans-serif;
    font-size: 26px;
    font-weight: 400;
    line-height: 30px;
    letter-spacing: 0em;
    text-align: left;
    color: #293845;
  }
  div:nth-child(2) {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
  }
`;
