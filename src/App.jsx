import { Outlet } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import MobileNavigation from "./components/MobileNavigation"
import axios from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { setBannerData ,setImageURL} from "./store/retroSlice"
import './App.css'




const App = () => {

  const dispatch =useDispatch();


  const fetchTrendingData = async ()=>{
    try {
      // OMDB doesn't have a trending endpoint; fetch multiple keywords concurrently,
      // dedupe and shuffle to maximize variety.
      const keywords = ['inception','matrix','avengers','batman','godfather','star wars','dark','pulp fiction','toy story','alien','joker','lotr','harry potter'];

      const promises = keywords.map(k => axios.get('/', { params: { s: k, page: 1 }}));
      const results = await Promise.allSettled(promises);

      const all = [];
      for(const r of results){
        if(r.status === 'fulfilled'){
          const items = r.value.data?.Search || [];
          all.push(...items);
        }
      }

      // dedupe
      const seen = new Set();
      const mapped = [];
      for(const item of all){
        if(!item || !item.imdbID) continue;
        if(seen.has(item.imdbID)) continue;
        seen.add(item.imdbID);
        mapped.push({
          id: item.imdbID,
          poster_path: item.Poster && item.Poster !== 'N/A' ? item.Poster : null,
          backdrop_path: item.Poster && item.Poster !== 'N/A' ? item.Poster : null,
          title: item.Title,
          original_title: item.Title,
          name: item.Title,
          overview: '',
          vote_average: 0,
          popularity: 0,
          release_date: item.Year,
          media_type: item.Type === 'series' ? 'tv' : 'movie',
        })
      }

      // shuffle (Fisher-Yates)
      for (let i = mapped.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [mapped[i], mapped[j]] = [mapped[j], mapped[i]];
      }

      dispatch(setBannerData(mapped.slice(0,12)));

    } catch (error) {
      console.log('error',error);
    }
  }

  const fetchConfiguration = async ()=>{
    try {
      // OMDB does not provide configuration; use direct image URLs returned by OMDB
      dispatch(setImageURL(''));
    
    } catch (error) {
      console.log("error",error);
    }
  }

  useEffect(()=>{
    fetchTrendingData();
    fetchConfiguration(); 
  },[])


  return (
    <main className="lg:pb-0 pb-14">
      <Header/>
      <div className="min-h-[90vh]">
        <Outlet/>
      </div>
      <Footer/>
      <MobileNavigation/>
    </main>
  )
}

export default App