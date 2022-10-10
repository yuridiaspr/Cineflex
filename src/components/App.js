import Cineflex from "./Cineflex";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import GlobalStyle from "../assets/css/GlobalStyle";

import Movie from "./Movie";
import MovieTime from "./MovieTime";
import SessionSeats from "./SessionSeats";
import Confirmation from "./Confirmation";

export default function App() {
  const [Data, setData] = useState(null);
  const [SelectedSeats, setSelectedSeats] = useState([]);
  const [CustomerName, setCustomerName] = useState(null);
  const [CPFCustomer, setCPFCustomer] = useState(null);

  return (
    <BrowserRouter>
      <GlobalStyle />
      <Cineflex />
      <Routes>
        <Route path="/" element={<Movie />} />
        <Route path="/sessoes/:idFilme" element={<MovieTime />} />
        <Route
          path="/assentos/:idSessao"
          element={
            <SessionSeats
              Data={Data}
              setData={setData}
              SelectedSeats={SelectedSeats}
              setSelectedSeats={setSelectedSeats}
              CustomerName={CustomerName}
              setCustomerName={setCustomerName}
              CPFCustomer={CPFCustomer}
              setCPFCustomer={setCPFCustomer}
            />
          }
        />
        <Route
          path="/sucesso"
          element={
            <Confirmation
              Data={Data}
              SelectedSeats={SelectedSeats}
              CustomerName={CustomerName}
              CPFCustomer={CPFCustomer}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
