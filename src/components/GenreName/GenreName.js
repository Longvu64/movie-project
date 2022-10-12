import styles from "./GenreName.module.scss";
import className from "classnames/bind";
import { useEffect, useState,Fragment, useContext } from "react";
import * as request from "../../config";
import { Link,  } from "react-router-dom";
import {MovieIdContext} from "../../App"

const cx = className.bind(styles);

function GenreName({item, idArray, onGetGenre}) {
  const context = useContext(MovieIdContext)
  const [pageLink, setPageLink] = useState(context.page)
  const [genreIdLink, setGenreIdLink] = useState(context.genreId)
  const [genres, setGenre] = useState([]);
  
  useEffect(() => {
    request
      .get(`genre/${context.type}/list`, {
        params: {
          api_key: "19f84e11932abbc79e6d83f82d6d1045",
        },
      })
      .then((res) => {
        setGenre(res.genres);
      });

  }, [context.type]);
  return (
    <Fragment>
      {genres.map((genre, id) => {
        if(idArray){
          if (idArray?.includes(genre.id)) {
            return ( 
              <Link 
                to={`/type=${context.type}/genre=${genre.id}/page=1`} 
                key={id} 
                onClick={(()=> {
                  context.getGenre(genre.id);
                  context.getPage(1);
                  context.getGenreName(genre.name);
                  setPageLink(context.page);
                  setGenreIdLink(context.genreId)
                })} 
                className={cx("genre")}
              >
                {genre.name}
              </Link>
            );
          }
        }else if(item){
          if (item.genre_ids.includes(genre.id)) {
            return (
              <Link 
                to={`/type=${context.type}/genre=${genre.id}/page=1`} 
                key={id} 
                onClick={(()=> {
                  context.getGenre(genre.id);
                  context.getPage(1);
                  context.getGenreName(genre.name);
                  setPageLink(context.page);
                  setGenreIdLink(context.genreId)
                })} 
                className={cx("genre")}
              >
                {genre.name}
              </Link>
            );
          }
        }
        })}
    </Fragment>
  );
}

export default GenreName;
