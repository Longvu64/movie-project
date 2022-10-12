import { useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import MovieCards from "../MovieCards/MovieCards"
import styles from "./BannerSeries.module.scss";
import className from "classnames/bind";
import {SlideNextButtonSwiper, SlidePrevButtonSwiper} from "../Buttons/Button";
import * as request from '../../config'

const cx = className.bind(styles);

function BannerSeries({data, type, getMovieId}) {
  const [movieApi, setMovieApi] = useState([]);
  
  useEffect(() => {
    request.get(`${type}/${type=== 'movie' ? data.serieMovie : data.serieTv}`,
       { params: {
          api_key: '19f84e11932abbc79e6d83f82d6d1045'
       }}
      )
      .then((res) => {
        setMovieApi(res.results);
      });
  }, [type]);

  return (
      <div className={cx("banner")}>
        <p className={cx("banner-title")}>{data.title}</p>
        <Swiper 
          spaceBetween={20} 
          slidesPerView={'auto'}
          className={cx("banner-slide")}>
            <SlideNextButtonSwiper/>
            <SlidePrevButtonSwiper/>
          
          {movieApi.map((item, id) => {
            return (
              <SwiperSlide key={id} className={cx('swiper')}>
                <MovieCards getMovieId={getMovieId} className={cx('swiper-cards')} item={item}/>
              </SwiperSlide>
            )
          })}
        </Swiper>
      </div>
  );
}

export default BannerSeries;
