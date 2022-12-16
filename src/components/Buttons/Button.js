import { React, useContext } from 'react';
import { useSwiper } from 'swiper/react';
import { RiArrowRightSLine, RiArrowLeftSLine } from "react-icons/ri";
import styles from "./Buttons.module.scss";
import className from "classnames/bind";
import { MovieIdContext } from "../../App";
import { Link } from 'react-router-dom';
const cx = className.bind(styles);


export  function SlideNextButton({onHandleNextBanner}) {

  return (
    <RiArrowRightSLine className={cx('right')} onClick={onHandleNextBanner}/>
  );
}
export  function SlidePrevButton({onHandlePrevBanner}) {
  return (
    <RiArrowLeftSLine className={cx('left')} onClick={onHandlePrevBanner}/>
  );
}
export  function SlideNextButtonSwiper() {
  const swiper = useSwiper();

  return (
    <RiArrowRightSLine className={cx('right')} onClick={() => swiper.slideNext()}/>
  );
}
export  function SlidePrevButtonSwiper() {
  const swiper = useSwiper();

  return (
    <RiArrowLeftSLine className={cx('left')} onClick={() => swiper.slidePrev()}/>
  );
}

export function WatchButton({onClick, item, watch}) {
  const context = useContext(MovieIdContext);

  return (
    <Link to={!watch ? `/type=${context.type}/id=${item}` : (
      context.type === 'tv' ? `/watch/type=${context.type}/id=${context.movieId}/s=${1}/e=${1}` : `/watch/type=${context.type}/id=${context.movieId}`)} 
      onClick={onClick} 
      className={cx("watch-btn")}
      >Watch now</Link>
  )
}