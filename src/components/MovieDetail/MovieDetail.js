import styles from "./MovieDetail.module.scss";
import className from "classnames/bind";
import * as request from "../../config";
import { useEffect, useState, useContext } from "react";
import { MovieIdContext } from "../../App";
import { WatchButton } from "../Buttons/Button";
import GenreName from "../GenreName/GenreName";
import { useParams } from "react-router-dom";

const cx = className.bind(styles);

function MovieDetail({type}) {
  const context = useContext(MovieIdContext);
  const [movieIdApi, setMovieIdApi] = useState([]);
  const [castApi, setCastApi] = useState([]);
  const [videoApi, setVideoApi] = useState([]);
  context.movieId = useParams().movieIdURL
  type = useParams().typeURL
  useEffect(() => {
    request
      .get(`/${type}/${context.movieId}`, {
        params: {
          api_key: "19f84e11932abbc79e6d83f82d6d1045",
        },
      })
      .then((data) => setMovieIdApi(data));
  }, [context.type,context.movieId]);

  useEffect(() => {
    request
      .get(`/${context.type}/${context.movieId}/credits`, {
        params: {
          api_key: "19f84e11932abbc79e6d83f82d6d1045",
        },
      })
      .then((data) => setCastApi(data.cast));
  }, [context.type,context.movieId]);

  useEffect(() => {
    request
      .get(`/${context.type}/${context.movieId}/videos`, {
        params: {
          api_key: "19f84e11932abbc79e6d83f82d6d1045",
        },
      })
      .then((data) => setVideoApi(data.results.slice(0, 1)));
  }, [context.type,context.movieId]);

  const idArray = movieIdApi?.genres?.reduce((acc, item) => {
    return acc.concat(item.id);
  }, []);
  return (
    <div className={cx("detail")}>
      <div className={cx("background")}>
        <img
          className={cx("img-backdrop")}
          src={`https://image.tmdb.org/t/p/original${movieIdApi.backdrop_path}`}
        />
      </div>

      <div className={cx("movie-info")}>
        <img
          className={cx("img-poster")}
          src={`https://image.tmdb.org/t/p/original${movieIdApi.poster_path}`}
        />
        <h1 className={cx("movie-name")}>{movieIdApi.title}</h1>
        <WatchButton />

        <div className={cx("genres")}>
          <GenreName idArray={idArray} />
        </div>
        <p className={cx("overview")}>{movieIdApi.overview}</p>
      </div>

      <div className={cx("trailer")}>
        {videoApi?.map((item,id) => {
          return (
            <iframe
              className="relative left-2/4 -translate-x-2/4 md:w-[700px] w-auto"
              width="727"
              height="409"
              key={id}
              src={`https://www.youtube.com/embed/${item.key }`}
              title={item.name}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          );
        })}
      </div>

      <div className={cx("cast")}>
        <h1 className={cx("cast-title")}>Cast</h1>
        <div className={cx("cast-info")}>
          {castApi?.slice(0, 5).map((item, id) => {
            return (
              <div key={id} className={cx("cast-item")}>
                <img
                  className={cx("cast-img")}
                  src={`https://image.tmdb.org/t/p/original${item.profile_path}`}
                />
                <p className={cx("cast-name")}>{item.name}</p>
              </div>
            );
          })}
        </div>
      </div>
      
    </div>
  );
}

export default MovieDetail;
