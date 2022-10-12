import { useContext } from "react";
import { AiFillStar } from "react-icons/ai";
import styles from "./MovieCards.module.scss";
import className from "classnames/bind";
import { Link } from "react-router-dom";
import {MovieIdContext} from "../../App"
const cx = className.bind(styles);

function MovieCards({ item, className}) {
  const context = useContext(MovieIdContext)
  return (
    <div 
      onClick={(() => {
        context.getMovieId(item.id);
        context.getMovieName(item.title || item.name)
      })} 
      className={cx("movie-card",className)}>
      <Link to={`/type=${context.type}/id=${item.id}`} >
        <img
          className={cx("img-above")}
          src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
        />
        <img
          className={cx("img-blur")}
          src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
        />
        <div className={cx("movie-rated")}>
          <span>{Number(item.vote_average).toFixed(1)}</span>
          <AiFillStar />
        </div>
        <p className={cx("movie-name")}>{item.title || item.name}</p>
      </Link>
    </div>
  );
}

export default MovieCards;
