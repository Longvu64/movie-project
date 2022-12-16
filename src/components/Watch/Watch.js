import React, { useState, useEffect, useContext } from 'react'
import { AiFillStar } from "react-icons/ai";
import styles from './Watch.module.scss'
import className from 'classnames/bind'
import * as request from '../../config';
import { useParams, useNavigate } from 'react-router-dom';
import { MovieIdContext } from "../../App";
import Similar from '../Similar/Similar';

const cx = className.bind(styles);
const Watch = () => {
    const [movieIdApi, setMovieIdApi] = useState([]);
    const [seasonApi, setSeasonApi] = useState([]);
    const [season, setSeason] = useState(useParams().season);
    const [episodes, setEpisodes] = useState(useParams().episode)
    const context = useContext(MovieIdContext);
    const [similar, setSimilar] = useState([])
    context.movieId = useParams().movieIdURL
    context.type = useParams().typeURL
    const navigate = useNavigate()

    const [movieLink, setMovieLink] = useState(`https://www.2embed.to/embed/tmdb/tv?id=${context.movieId}&s=${season}&e=${episodes}`)

    useEffect(() => {
        setMovieLink(`https://www.2embed.to/embed/tmdb/tv?id=${context.movieId}&s=${season}&e=${episodes}`)
    }, [context.movieId, episodes])
    
    useEffect(() => {
        request
          .get(`/${context.type}/${context.movieId}`, {
            params: {
              api_key: "19f84e11932abbc79e6d83f82d6d1045",
            },
          })
          .then((data) => setMovieIdApi(data));
      }, [context.type,context.movieId]);

      //Season API
    useEffect(() => {
        request
          .get(`/${context.type}/${context.movieId}/season/${season}`, {
            params: {
              api_key: "19f84e11932abbc79e6d83f82d6d1045",
            },
          })
          .then((data) => setSeasonApi(data.episodes));
      }, [context.type,context.movieId,season]);

      //Similar API
    useEffect(() => {
        request.get(`${context.type}/${context.movieId}/similar`,
        {params: {
            api_key: "19f84e11932abbc79e6d83f82d6d1045"
        }})
        .then(data => setSimilar(data.results))
    },[context.type, context.movieId])

  return (
    <div className={cx('container')}>
        <div className={cx('watch')}>
            <iframe
                id="iframe"
                title="iframe"
                src={context.type === 'movie' ? `https://www.2embed.to/embed/tmdb/movie?id=${context.movieId}` : movieLink}
                width='100%'
                height='450'
                className="relative w-full h-full top-0 left-0"
                frameBorder="0"
                allowFullScreen
            ></iframe>
            <h1 className={cx('title')}>{movieIdApi.title || movieIdApi.name}</h1>
            <div className={cx("rate")}>
                <span>{Number(movieIdApi.vote_average).toFixed(1)}</span>
                <AiFillStar/>
            </div>
            {
                context.type === 'tv' ? (
                   <>
                        <select onChange={(e) => {
                            setSeason(e.target.value)
                        }} 
                            className={cx('option')}>
                            <option hidden value="">Seasons</option>
                            {movieIdApi.seasons?.map((item, id) => {
                                if(!item?.season_number == 0)
                                return <option key={id} value={item.season_number}>{`Season ${item.season_number}`}</option>
                            })}
                        </select>
                        
                        <select 
                            onChange={(e) => {
                                setEpisodes(e.target.value);
                                navigate(`/watch/type=${context.type}/id=${context.movieId}/s=${season}/e=${e.target.value}`)
                            }} 
                            className={cx('option')}
                        >
                            <option hidden value="">Episodes</option>
                            {seasonApi?.map((item, id) => {
                                return <option key={id} value={item.episode_number}>{`Episodes ${item.episode_number}`}</option>
                            })}
                        </select>
                   </>
                ) : ( undefined)
            }
            <h2 className={cx('desc')}>Overview</h2>
            <p className={cx('overview')}>{movieIdApi.overview}</p>
        </div>
        <div className={cx('recommended')}>
            <h2 className={cx('recommended-title')}>Recommended</h2>
            <div className={cx('recommended-card')}>
                {similar?.slice(0,4).map((item, id) => (
                    <Similar key={id} data={item}/>
                ))}
            </div>
        </div>
    </div>
  )
}

export default Watch
