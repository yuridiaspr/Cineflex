import colors from "../assets/css/colors";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import loading from "../assets/images/Loading_icon.gif";

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
      <StyledHeader>Selecione o filme</StyledHeader>
      <StyledMovieList>
        {MovieList !== null ? (
          MovieList.map((movie, i) => (
            <Link to={`/sessoes/${movie.id}`}>
              <StyledMovieContainer data-identifier="movie-outdoor">
                <img src={movie.posterURL} />
              </StyledMovieContainer>
            </Link>
          ))
        ) : (
          <img src={loading} />
        )}
      </StyledMovieList>
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
  }
`;

const StyledMovieList = styled.div`
display: flex;
flex-wrap: wrap;
justify-content: start;
align-items: center;
  }
`;

const StyledMovieContainer = styled.div`
  width: 145px;
  height: 209px;
  background: #ffffff;
  box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.1);
  border-radius: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5.5px 15px;
  img {
    width: 129px;
    height: 193px;
  }
`;
