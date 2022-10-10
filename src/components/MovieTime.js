import loading from "../assets/images/Loading_icon.gif";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

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
      <div className="header">Selecione o horário</div>

      {SchedulesList !== null ? (
        <>
          <div className="AllTimesAvailable">
            {SchedulesList.days.map((Schedule, ind) => (
              <div className="ScheduleContainer">
                <p>
                  {Schedule.weekday} - {Schedule.date}
                </p>
                <div>
                  {Schedule.showtimes.map((Time, ind) => (
                    <Link to={`assentos/${Time.id}`}>
                      <button>{Time.name}</button>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="footer">
            <div>
              <img src={SchedulesList.posterURL} />
            </div>
            <p>{SchedulesList.title}</p>
          </div>
        </>
      ) : (
        <img src={loading} />
      )}
    </>
  );
}
