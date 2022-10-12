import { useEffect, useState, useContext } from "react";
import "swiper/css";
import styles from "./Banner.module.scss";
import className from "classnames/bind";
import { MovieIdContext } from "../../App";
import {SlideNextButton,SlidePrevButton, WatchButton} from "../Buttons/Button";
import * as request from "../../config";
import GenreName from "../GenreName/GenreName";
import { Link, useParams } from "react-router-dom";

const cx = className.bind(styles);

function Banner({type, page, genreId, onGetGenre}) {
  const context = useContext(MovieIdContext);

  const [movieApi, setMovieApi] = useState([]);
  const [index, setIndex] = useState(0);
  const handleNextBanner = () => {
    setIndex((prev) => prev + 1);
  };
  const handlePrevBanner = () => {
    setIndex((prev) => prev - 1);
  };
  useEffect(() => {
    request
      .get(`trending/${type}/day`, {
        params: {
          api_key: "19f84e11932abbc79e6d83f82d6d1045",
        },
      })
      .then((res) => {
        setMovieApi(res.results);
      });
  }, [type]);
console.log(type);
  
  return (
    <div className={cx("banner")}>
      {movieApi.length >= 1 &&
        movieApi.slice(0, 3).map((item, id) => {
          if (index < 0) {
            setIndex(movieApi.slice(0, 3).length - 1);
          }

          if (index > movieApi.slice(0, 3).length - 1) {
            setIndex(0);
          }
          let classes = "current-slide";

          if (id !== index) {
            classes = "next-slide";
          }
          if (
            id === index - 1 ||
            (index === 0 && id === movieApi.slice(0, 3).length - 1)
          ) {
            classes = "prev-slide";
          }

          return (
            <div className={cx("banner-item", classes)} key={id}>
              <div className={cx("banner-info")}>
                <p className={cx("movie-name")}>{item.title || item.name}</p>
                <div className={cx("genres")}>
                 
                  <GenreName onGetGenre={onGetGenre} page={page} genreId={genreId} type={type} item={item}/>
                </div>
                <WatchButton onClick={() => context.getMovieId(item.id)} item={item.id}/>
              </div>
              <SlideNextButton onHandleNextBanner={handleNextBanner} />
              <SlidePrevButton onHandlePrevBanner={handlePrevBanner} />

              <img
                src={`https://image.tmdb.org/t/p/original${item.backdrop_path}`}
              />
            </div>
          );
        })}
    </div>
  );
}

export default Banner;
