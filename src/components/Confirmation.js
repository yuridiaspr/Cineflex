import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import axios from "axios";
import loading from "../assets/images/Loading_icon.gif";

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
  return (
    <>
      <div className="headerConfirmation">Pedido feito com sucesso!</div>
      <div className="ConfirmationContainer">
        <h1>Filme e sessão</h1>
        <h2>{Data.movie.title}</h2>
        <h2>
          {Data.day.date} {Data.name}
        </h2>
      </div>
      <div className="ConfirmationContainer">
        <h1>Ingressos</h1>
        {SelectedSeats.map((seats) => (
          <h2>Assento {RepresentSeatName(seats.name)}</h2>
        ))}
      </div>
      <div className="ConfirmationContainer">
        <h1>Comprador</h1>
        <h2>Nome: {CustomerName}</h2>
        <h2>CPF: {CPFCustomer}</h2>
      </div>
      <StyledGoHome>
        <Link to={`/`}>
          <StyledButtonGoHome>Voltar pra Home</StyledButtonGoHome>
        </Link>
      </StyledGoHome>
    </>
  );
}

const StyledGoHome = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  Link {
    text-decoration: none;
  }
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
`;
