import React from 'react'
import { CgClose } from "react-icons/cg";
import useFetchDetails from '../hooks/useFetchDetails';


const Videoplay = ({data,close,media_type}) => {

    const {data : videoData} = useFetchDetails(`/${media_type}/${data.id}/videos`)
    // console.log("videoData",videoData);
return (
    <section 
    className='fixed bg-black top-0 bottom-0 right-0 left-0 z-40 bg-opacity-55 flex items-center justify-center '
    >
        <div className="bg-black w-full max-h-[80vh] max-w-screen-lg rounded-lg aspect-video relative ">
            <button onClick={close} className='absolute right-0 -top-8 text-white z-50'>
                <CgClose size={35}/>
            </button>

            <iframe
                src={`https://www.youtube.com/embed/${videoData?.results[0]?.key}`} 
                className='w-full h-full'
            />

        </div>
    </section>
)
}

export default Videoplay