import { useEffect, useState } from "react";
import { Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import MovieCards from "../MovieCards/MovieCards"
import styles from "./BannerSeries.module.scss";
import className from "classnames/bind";
import {SlideNextButtonSwiper, SlidePrevButtonSwiper} from "../Buttons/Button";
import * as request from '../../config'
import { MovieIdContext } from "../../App";
import { useContext } from "react";
const cx = className.bind(styles);

function BannerSeries({data}) {
  const [movieApi, setMovieApi] = useState([]);
  const context = useContext(MovieIdContext)
  useEffect(() => {
    if(!context.type){
      context.handleTypeMovie()
    }
  },[])
  useEffect(() => {
    request.get(`${context.type}/${(context.type === 'movie') ? data.serieMovie : data.serieTv}`,
       { params: {
          api_key: '19f84e11932abbc79e6d83f82d6d1045'
       }}
      )
      .then((res) => {
        setMovieApi(res.results);
      });
  }, [context.type]);

  return (
      <div className={cx("banner")}>
        <p className={cx("banner-title")}>{data.title}</p>
        <Swiper 
          spaceBetween={20} 
          slidesPerView={'auto'}
          className={cx("banner-slide")}>
            <SlideNextButtonSwiper/>
            <SlidePrevButtonSwiper/>
          
          {movieApi?.map((item, id) => {
            return (
              <SwiperSlide key={id} className={cx('swiper')}>
                <MovieCards className={cx('swiper-cards')} item={item}/>
              </SwiperSlide>
            )
          })}
        </Swiper>
      </div>
  );
}

export default BannerSeries;
