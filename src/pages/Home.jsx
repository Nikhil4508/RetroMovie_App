import { useSelector } from "react-redux"
import BannerHome from "../components/BannerHome"
import HorizontalScroll from "../components/HorizontalScroll";
import useFetch from "../hooks/UseFetch";



const Home = () => {

    const trendingData = useSelector(state => state.retroMovieData.bannerData);    
    const {data:nowPlayingData} =useFetch("/movie/now_playing");
    const {data:topRatedData} =useFetch("/movie/top_rated");
    const {data:popularTvShowData} =useFetch("/tv/popular");
    const {data:onAirTvData} =useFetch("/tv/on_the_air");


    return (
        <section>
            <BannerHome/>
            <HorizontalScroll data={trendingData} heading={"Trending"} trending={true} />
            <HorizontalScroll data={nowPlayingData} heading={"Now Playing"} media_type={"movie"}/>
            <HorizontalScroll data={topRatedData} heading={"Top Rated Movies"} media_type={"movie"}/>
            <HorizontalScroll data={popularTvShowData} heading={"Popular TV Shows"} media_type={"tv"}/>
            <HorizontalScroll data={onAirTvData} heading={"On The Air"} media_type={"tv"}/>
            
        </section>
    )
}

export default Home