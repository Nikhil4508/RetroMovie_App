import { useSelector } from "react-redux";
import BannerHome from "../components/BannerHome";
import HorizontalScroll from "../components/HorizontalScroll";
import useFetch from "../hooks/UseFetch";

const nowPlayingKeywords = [
  String(new Date().getFullYear()),
  "release",
  "premiere",
  "blockbuster",
  "new",
];
const topRatedKeywords = [
  "oscar",
  "award",
  "classic",
  "top rated",
  "inception",
  "shawshank",
  "godfather",
];

// Pick random keywords ONCE per app load (module scope)
const randomNowPlaying =
  nowPlayingKeywords[Math.floor(Math.random() * nowPlayingKeywords.length)];
const randomTopRated =
  topRatedKeywords[Math.floor(Math.random() * topRatedKeywords.length)];

const Home = () => {
  const trendingData = useSelector((state) => state.retroMovieData.bannerData);

  const { data: nowPlayingData } = useFetch(
    `/?s=${encodeURIComponent(randomNowPlaying)}&type=movie`,
  );
  const { data: topRatedData } = useFetch(
    `/?s=${encodeURIComponent(randomTopRated)}&type=movie`,
  );
  const { data: popularTvShowData } = useFetch("/?s=star&type=series");
  const { data: onAirTvData } = useFetch("/?s=live&type=series");

  return (
    <section>
      <BannerHome />
      <HorizontalScroll
        data={trendingData}
        heading={"Trending"}
        trending={true}
      />
      <HorizontalScroll
        data={nowPlayingData}
        heading={"Now Playing"}
        media_type={"movie"}
      />
      <HorizontalScroll
        data={topRatedData}
        heading={"Top Rated Movies"}
        media_type={"movie"}
      />
      <HorizontalScroll
        data={popularTvShowData}
        heading={"Popular TV Shows"}
        media_type={"tv"}
      />
      <HorizontalScroll
        data={onAirTvData}
        heading={"On The Air"}
        media_type={"tv"}
      />
    </section>
  );
};

export default Home;
