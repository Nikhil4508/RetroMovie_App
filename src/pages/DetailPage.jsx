import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import useFetchDetails from '../hooks/useFetchDetails';
import { useSelector } from 'react-redux';
import moment from 'moment';
import Divider from '../components/Divider';
import HorizontalScroll from '../components/HorizontalScroll';
import useFetch from '../hooks/UseFetch';
import Videoplay from '../components/Videoplay';


const DetailPage = () => {
  const params = useParams();
  const imageURL = useSelector(state =>state.retroMovieData.imageURL);
  const {data} = useFetchDetails(`/${params?.mediaType}/${params?.id}`);
  const {data : castData} = useFetchDetails(`/${params?.mediaType}/${params?.id}/credits`);
  const {data : similarData} = useFetch(`/${params?.mediaType}/${params?.id}/similar`);
  const [playvideo,setPlayVideo] = useState(false);
  const [playVideoId,setPlayVideoId] = useState("");

  const handlePlayVideo = (movieData) => {
    setPlayVideoId(movieData);
    setPlayVideo(true);
  };
  
  // console.log("params",data);
  // console.log("star cast",castData);
  
  const duration =(Number(data?.runtime)/60).toFixed(1).split(".");
  //const writer = castData?.crew?.filter(el => el?.job === "Writer")?.map(el => el.name || el.oroginal_name)?.join(",");
  


  return (
    <div className=''>
      <div className=" w-full h-[360px] relative hidden lg:block ">
        <div className="w-full h-full ">
          <img 
            src={imageURL+data?.backdrop_path} 
            alt="" 
            className='w-full h-full object-cover '
          />
        </div>
        <div className="absolute top-0 w-full h-full bg-gradient-to-t from-neutral-800/95 to-transparent "></div>
      </div>

      <div className="container mx-auto px-6 py-16 lg:py-0 mt-4 flex flex-col lg:flex-row lg:gap-10 gap-6"
      >
        <div className="lg:-mt-36 mx-auto lg:mx-0 w-fit relative">
          <img 
            src={imageURL+data?.poster_path} 
            alt="" 
            className='w-80 max-w-[240px] h-96 object-cover rounded-md'
          />
            <button onClick={()=>handlePlayVideo(data?.id)} className='mt-3 px-4 py-2 bg-white text-black font-bold text-lg w-full rounded-lg hover:bg-gradient-to-l from-red-400 to-orange-400 hover:text-white hover:scale-105 duration-300'>Play Now</button>
        </div>

        <div >
          <h1 className='text-white text-3xl lg:text-5xl font-bold mb-1'>{data?.name || data?.original_name || data?.original_title || data?.title}</h1>
          <p className='text-neutral-500 text-md'>{data?.tagline}</p>

          <Divider/>

          <div className="flex items-center gap-3 text-center">
            <p>Rating : {Number(data?.vote_average).toFixed(1)}+</p>
            <span>|</span>
            <p>View : {Number(data?.vote_count).toFixed(0)}K</p>
            <span>|</span>
            <p>Duration : {duration[0]}h {duration[1]}m</p>
          </div>

          <Divider/>

          <div className="">
            <h2 className='text-white font-bold text-xl mb-1'>Overview</h2>
            <p>{data?.overview}</p>

            <Divider/>

            <div className="flex gap-3  text-center">
              <p>Status: {data?.status}</p>
              <span>|</span>
              <p>Release Date : {moment(data?.release_date).format('MMM Do YY')}</p>
              <span>|</span>
              <p>Revenue : {data?.revenue}</p>
            </div>

            <Divider/>
          </div>

          <div className="">
            <p>
              <span className='text-white'>Director</span> : {castData?.crew[3]?.name || castData?.crew[3]?.original_name}
            </p>
            <Divider/>
            <p>
              <span className='text-white'>Writer</span> : {castData?.crew[4]?.name || castData?.crew[4]?.original_name} 
            </p>
          </div>

        <Divider/>
          <h2 className='text-lg font-bold text-white mb-2 '>Cast :</h2>
          <div className="grid grid-cols-[repeat(auto-fit,96px)] gap-4 place-content-center ">
            {castData?.cast?.filter(el => el.profile_path).map((cast,index)=>{
              return(
                <div className="" key={index}>
                  <div className=" ">
                    <img 
                      src={imageURL+cast.profile_path} alt="" 
                      className='w-24 h-24 rounded-full object-cover mb-1'
                    />
                  </div>
                  <p className='text-center text-sm font-bold text-neutral-400'>{cast?.name || cast?.original_name}</p>
                </div>
              )
            })}
          </div>

        </div>

      </div>
        <div className="">
          <HorizontalScroll data={similarData} heading={"Similar "+params?.mediaType} media_type={params?.mediaType}/>
        </div>

        {
          playvideo && (
            <Videoplay data={playVideoId} close={()=> setPlayVideo(false)} media_type={params?.mediaType}/>
          )
        }
    </div>
  )
}

export default DetailPage