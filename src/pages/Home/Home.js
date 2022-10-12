import { Fragment } from "react";
import Banner from "../../components/Banner/Banner";
import BannerSeries from "../../components/BannerSeries/BannerSeries";
import Header from "../../components/Header/Header";

const bannerSeriesList = [
    {
        serieMovie: 'top_rated',
        serieTv: 'top_rated',
        title: 'Top rated',
    },
    {
        serieMovie: 'popular',
        serieTv: 'popular',
        title: 'Popular'
    },
    {
        serieMovie: 'now_playing',
        serieTv: 'airing_today',
        title: 'Now Playing'
    },
]
function Home({ handleTypeMovie, handleTypeTv, type, onGetGenre, getMovieId }) {
    return ( 
        <Fragment>
            {/* <Header 
                handleTypeMovie={handleTypeMovie} 
                handleTypeTv={handleTypeTv} 
                type={type}
                onGetGenre={onGetGenre}
            /> */}
            <Banner  onGetGenre={onGetGenre} type={type}/>
            {bannerSeriesList.map((serie,id) => {
                return (
                    <BannerSeries data={serie} key={id} getMovieId={getMovieId} type={type}/>
                )
            })}
        </Fragment>
     );
}

export default Home;