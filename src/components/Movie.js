import colors from "../assets/css/colors";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import loading from "../assets/images/Loading_icon.gif";

function ChooseMovie(movie) {
  console.log("Choose", movie.title);
}

export default function Movie() {
  const [MovieList, setMovieList] = useState(null);

  useEffect(() => {
    const request = axios.get(
      "https://mock-api.driven.com.br/api/v5/cineflex/movies"
    );
    request.then((response) => setMovieList(response.data));
  }, []);

  return (
    <>
      <div className="header">Selecione o filme</div>
      <div className="MovieList">
        {MovieList !== null ? (
          MovieList.map((movie, i) => (
            <Link to={`/sessoes/${movie.id}`}>
              <div
                onClick={() => ChooseMovie(movie)}
                className="MovieContainer"
              >
                <img src={movie.posterURL} />
              </div>
            </Link>
          ))
        ) : (
          <img src={loading} />
        )}
      </div>
    </>
  );
}
