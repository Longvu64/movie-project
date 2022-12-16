import React from 'react'
import { AiFillStar } from "react-icons/ai";
import { Link } from 'react-router-dom';
import styles from './Similar.module.scss'
import className from 'classnames/bind'
import { useContext } from 'react';
import {MovieIdContext} from '../../App'
const cx = className.bind(styles);
const Similar = ({data}) => {
  const context = useContext(MovieIdContext)
  
  return (
    <Link to={`/type=${context.type}/id=${data.id}`} onClick={(() => {context.getMovieId(data.id)})} className={cx('container')}>
       <img
          className={cx("img-poster")}
          alt='poster'
          src={`https://image.tmdb.org/t/p/original${data.poster_path}`}
        />
        <div className={cx("similar-info")}>
            <div>
                <h3 className={cx("similar-title")}>{data.title || data.name}</h3>
                <p className={cx("similar-date")}>{data.release_date || data.first_air_date}</p>
            </div>
            <div className={cx("rate")}>
                <span>{data.vote_average.toFixed(1)}</span>
                <AiFillStar/>
            </div>
        </div>
    </Link>
  )
}

export default Similar
