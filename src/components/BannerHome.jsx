import { useSelector } from "react-redux";
import { TbChevronRight } from "react-icons/tb";
import { TbChevronLeft } from "react-icons/tb";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const BannerHome = () => {
    // Accessing bannerData from Redux store
    const bannerData = useSelector(state => state.retroMovieData.bannerData);
    const imageURL = useSelector(state =>state.retroMovieData.imageURL);
    
    const [currentImage,setCurrentImage] = useState(0);


    const handleNext = () => {
        if(currentImage < bannerData.length - 1){
            setCurrentImage((previous) => previous + 1)
        }
    }
    const handlePrevious = () => {
        if(currentImage > 0){
            setCurrentImage((previous) => previous - 1)
        }
    }

    useEffect(()=>{
        const interval = setInterval(() => {
            if(currentImage < bannerData.length - 1){
                handleNext()
            }else{
                setCurrentImage(0)
            }
        },5000);
        return ()=>clearInterval(interval);
    },[bannerData,imageURL,currentImage])


    return (
        <section className="w-full h-full">
            <div className="flex min-h-full max-h-[100vh] overflow-hidden">
                <div 
                    className="flex transition-transform duration-500" 
                    style={{ transform: `translateX(-${currentImage * 100}%)` }} 
                >
                {bannerData.map((data,index)=> {
                    return (
                        <div className="min-w-full min-h-[450px] lg:min-h-full relative group" key={index}>
                            <div className="w-full h-full">
                                <img
                                    className="w-full h-full object-cover"
                                    src={imageURL+data.backdrop_path} 
                                    alt="" 
                                />
                            </div>

                            {/* Next and previous image button */}
                            <div className="w-full h-full hidden items-center justify-between absolute top-0 px-4 group-hover:lg:flex">
                                <button 
                                    className="p-1 text-neutral-300 bg-white/15 rounded-full hover:bg-white/25 z-10 hover:text-black duration-300"
                                    onClick={handlePrevious}
                                    disabled={currentImage === 0}
                                >
                                    <TbChevronLeft size={30}/>
                                </button>
                                <button 
                                    className="p-1 text-neutral-300 bg-white/15 rounded-full hover:bg-white/25 z-10 hover:text-black duration-300"
                                    onClick={handleNext}
                                    disabled={currentImage === bannerData.length - 1}
                                >
                                    <TbChevronRight size={30}/>
                                </button>
                            </div>

                            <div className="absolute top-0 w-full h-full bg-gradient-to-t from-neutral-900 to-transparent"></div>

                            <div className="container mx-auto">
                                <div className="absolute bottom-0 max-w-md px-4 ">
                                    <h1
                                        className="font-bold text-2xl lg:text-4xl text-white drop-shadow-2xl"
                                    >
                                        {data?.title ||data?.original_name || data?.original_title}
                                    </h1>
                                    <p className="text-ellipsis line-clamp-3 my-2">
                                        {data.overview}
                                    </p>
                                    <div className="flex items-center gap-4">
                                        <p className="">
                                            Rating : {Number(data.vote_average).toFixed(1)}+
                                        </p>
                                        <span>|</span>
                                        <p className="">
                                            Popularity : {Number(data.popularity).toFixed(0)}
                                        </p>
                                    </div>
                                    <Link to={"/"+data?.media_type+"/"+data?.id} >
                                        <button 
                                            className="text-black px-6 py-2 bg-white my-3 rounded-md font-semibold hover:bg-gradient-to-l from-red-400 to-orange-400 hover:text-white hover:scale-105 transition-all"
                                        >
                                        Play Now
                                        </button>
                                    </Link>
                                </div>
                            </div>
                            
                        </div>
                    )
                })}
                </div>
            </div>
        </section>
    );
};

export default BannerHome;
