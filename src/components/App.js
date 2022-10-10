import Cineflex from "./Cineflex";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyle from "../assets/css/GlobalStyle";

import Movie from "./Movie";
import MovieTime from "./MovieTime";
import SessionSeats from "./SessionSeats";
import Confirmation from "./Confirmation";

export default function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Cineflex />
      <Routes>
        <Route path="/" element={<Movie />} />
        <Route path="/sessoes/:idFilme" element={<MovieTime />} />
        <Route path="/assentos/:idSessao" element={<SessionSeats />} />
        <Route path="/sucesso" element={<Confirmation />} />
      </Routes>
    </BrowserRouter>
  );
}
