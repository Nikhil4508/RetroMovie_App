import React, { useRef } from 'react'
import Card from './Card'
import { TbChevronRight } from "react-icons/tb";
import { TbChevronLeft } from "react-icons/tb";
import '../App'

const HorizontalScroll = ({data=[],heading,trending,media_type}) => {
    const containerref = useRef();
    const handleNext = ()=> {
        containerref.current.scrollLeft += 265
    }
    const handlePrevious = ()=> {
        containerref.current.scrollLeft -= 265
    }

  return (
    <div>
        <div className="container mx-auto px-4 my-10">
                <h1 className="text-white text-xl lg:text-3xl font-bold mb-3 capitalize">{heading}</h1>

                <div className=" relative">
                    <div ref={containerref} className="grid grid-cols-[repeat(auto-fit,240px)] grid-flow-col gap-6 overflow-x-scroll overflow-hidden relative z-10 scroll-smooth transition-all scrollbar_none ">
                        {
                            data.map((data,index) => {
                            return(
                                <Card key={data.id+"heading"+index} data={data} index={index+1} trending={trending} media_type={media_type}/>
                            )})
                        }
                    </div>

                    <div className="absolute w-full h-full top-0 hidden lg:flex items-center justify-between">
                        <button 
                            className="p-1 text-neutral-900 bg-white/65 rounded-full  z-10 hover:bg-white/30 hover:text-white duration-300 -ml-1"
                            onClick={handlePrevious}
                        >
                            <TbChevronLeft size={30}/>
                        </button>
                        <button 
                            className="p-1 text-neutral-900 bg-white/65 rounded-full hover:bg-white/30 z-10 hover:text-white duration-300 -mr-1"
                            onClick={handleNext}
                        >
                            <TbChevronRight size={30}/>
                        </button>
                    
                    </div>
                </div>
            </div>
    </div>
  )
}

export default HorizontalScroll