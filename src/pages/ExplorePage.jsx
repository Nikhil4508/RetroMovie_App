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
      const response = await axios.get(`/discover/${params.explore}`,{
        params :{
          page: pageNo,
        }
      });

      setData((previous)=> {
        return [ 
          ...previous,
          ...response.data.results
        ]
      });

      setTotalPage(response.data.total_pages);
    } catch (error) {
      console.log("error",error)
    }
  }
  
  const handleScroll = () => {
    if((window.innerHeight + window.scrollY) >= document.body.offsetHeight){
      setPageNo((prev) => prev + 1);
    }
  }

  useEffect(() => {
    fetchData()
  },[pageNo]);

  useEffect(() => {
    setPageNo(1)
    setData([])
    fetchData()
  },[params.explore]);

  useEffect(()=>{
    window.addEventListener("scroll",handleScroll)
  },[])

  return (
    <div className='py-16 px-6'>
      <div className="container mx-auto ">
        <h2 className='capitalize text-lg lg:text-2xl font-semibold my-4'>Popular {params.explore}</h2>

        <div className=" grid grid-cols-[repeat(auto-fit,240px)] gap-10 justify-center  ">
          {/* lg:justify-start */}
          {data.map((exploreData,index) => {
            return (
              <Card data={exploreData} key={exploreData.id+"exploreSection"+index} media_type={params.explore}/>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default ExplorePage