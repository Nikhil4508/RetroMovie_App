import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Card from '../components/Card';

const ExplorePage = () => {

  const params = useParams();
  const [pageNo,setPageNo] = useState(1);
  const [data,setData] = useState([]);
  const [totalPage,setTotalPage] = useState(0);
  //console.log("params",params.explore);

  const fetchData = async () => {
    try {
      const mediaType = params.mediaType || 'movie';
      const omdbType = mediaType === 'tv' ? 'series' : 'movie';
      // pick a small set of queries for this page and fetch concurrently
      const movieQueries = ['inception','matrix','avengers','godfather','dark knight','pulp fiction','toy story','alien','terminator','blade runner'];
      const tvQueries = ['breaking bad','friends','batman','simpsons','game of thrones','stranger things','the office','westworld','lost','brooklyn nine-nine'];
      const queries = mediaType === 'tv' ? tvQueries : movieQueries;

      // sample up to 3 queries for this page (rotate deterministically by pageNo)
      const qCount = Math.min(3, queries.length);
      const start = ((pageNo - 1) * 1) % queries.length;
      const selected = [];
      for (let i = 0; i < qCount; i++) selected.push(queries[(start + i) % queries.length]);

      const promises = selected.map(q => axios.get('/', { params: { s: q, type: omdbType, page: pageNo }}));
      const results = await Promise.allSettled(promises);

      const all = [];
      for(const r of results){
        if(r.status === 'fulfilled'){
          const items = r.value.data?.Search || [];
          all.push(...items);
        }
      }

      // dedupe and map
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
          name: item.Title,
          overview: '',
          vote_average: 0,
          popularity: 0,
          release_date: item.Year,
          media_type: item.Type === 'series' ? 'tv' : 'movie'
        })
      }

      // shuffle mapped results
      for (let i = mapped.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [mapped[i], mapped[j]] = [mapped[j], mapped[i]];
      }

      setData((previous) => {
        return [
          ...previous,
          ...mapped
        ]
      });

      setTotalPage(Math.ceil((mapped.length || 0) / 10));
    } catch (error) {
      console.log("error",error)
    }
  }
  
  useEffect(() => {
    const handleScroll = () => {
      if((window.innerHeight + window.scrollY) >= document.body.offsetHeight){
        setPageNo((prev) => prev + 1);
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  },[])

  useEffect(() => {
    setPageNo(1)
    setData([])
  },[params.mediaType]);

  useEffect(() => {
    fetchData()
  },[pageNo, params.mediaType]);

  return (
    <div className='py-16 px-6'>
      <div className="container mx-auto ">
        <h2 className='capitalize text-lg lg:text-2xl font-semibold my-4'>Popular {params.mediaType}</h2>

        <div className=" grid grid-cols-[repeat(auto-fit,240px)] gap-10 justify-center  ">
          {/* lg:justify-start */}
          {data.map((exploreData,index) => {
            return (
              <Card data={exploreData} key={exploreData.id+"exploreSection"+index} media_type={params.mediaType}/>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default ExplorePage