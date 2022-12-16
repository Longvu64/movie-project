import { Fragment, useContext } from "react";
import Banner from "../../components/Banner/Banner";
import BannerSeries from "../../components/BannerSeries/BannerSeries";
import { MovieIdContext } from "../../App";

const bannerSeriesList = [
    {
        serieMovie: 'upcoming',
        serieTv: 'airing_today',
        title: 'Latest',
    },
    {
        serieMovie: 'popular',
        serieTv: 'popular',
        title: 'Popular'
    },
    {
        serieMovie: 'top_rated',
        serieTv: 'top_rated',
        title: 'Top Rated'
    },
]
function Home() {

    const context = useContext(MovieIdContext);
    return ( 
        <Fragment>
            <Banner/>
            {bannerSeriesList.map((serie,id) => {
                return (
                    <BannerSeries data={serie} key={id}/>
                )
            })}
        </Fragment>
     );
}

export default Home;