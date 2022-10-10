import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
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
  }

  function SelectSeat(seat) {
    if (seat.isAvailable === false) {
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
          <div className="header">Selecione o(s) assento(s)</div>
          <div className="Seats">
            {SeatList.map((seat, ind) => (
              <button
                onClick={() => SelectSeat(seat)}
                className={RepresentSeatColor(seat.isAvailable, seat.selected)}
              >
                {RepresentSeatName(seat.name)}
              </button>
            ))}
          </div>
          <div className="Subtitle">
            <div>
              <button></button>
              <p>Selecionado</p>
            </div>
            <div>
              <button></button>
              <p>Disponível</p>
            </div>
            <div>
              <button></button>
              <p>Indisponível</p>
            </div>
          </div>
          <div className="CustomerForm">
            <form onSubmit={submitData}>
              <label htmlFor="nome">Nome do comprador:</label>
              <input
                type="text"
                id="nome"
                placeholder="Digite seu nome"
                onChange={(e) => setCustomerName(e.target.value)}
                required
              ></input>
              <label htmlFor="cpf">CPF do comprador:</label>
              <input
                type="text"
                id="cpf"
                pattern="[0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}"
                placeholder="Digite seu CPF (xxx.xxx.xxx-xx)"
                onChange={(e) => setCPFCustomer(e.target.value)}
                required
              ></input>
              <div>
                <Link
                  to={`/sucesso`}
                  className="CustomerFormButton"
                  type="submit"
                >
                  Reservar assento(s)
                </Link>
              </div>
            </form>
          </div>
          <div className="footer">
            <div>
              <img src={Data.movie.posterURL} />
            </div>
            <div>
              <p>{Data.movie.title}</p>
              <p>
                {Data.day.weekday} - {Data.name}
              </p>
            </div>
          </div>
        </>
      ) : (
        <img src={loading} />
      )}
    </>
  );
}
