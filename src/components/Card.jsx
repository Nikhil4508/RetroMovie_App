import { useSelector } from 'react-redux'
import moment from 'moment';
import { Link } from 'react-router-dom';


const Card = ({data,trending,index,media_type}) => {
    const imageURL = useSelector(state => state.retroMovieData.imageURL);
    const mediaType = data.media_type ?? media_type;    

    return (
        <Link to={"/"+mediaType+"/"+data.id} className='w-full min-w-[240px] max-w-[240px] h-80 overflow-hidden rounded-md block relative hover:scale-105 duration-300'>

            {
                data?.poster_path ? (
                    <img 
                        src={imageURL+data?.poster_path} 
                        alt="" 
                    />
                ):(
                    <div className="w-full h-full flex items-center justify-center bg-neutral-700">
                        no image found
                    </div>
                )
            }

            
            <div className="absolute top-3 ">
                {trending && (
                    <div className="py-1 px-4 bg-black/60 backdrop-blur-3xl rounded-r-full overflow-hidden">
                        #{index} Trending
                    </div>
                )}
            </div>

            <div className="absolute bottom-0 w-full h-16 p-2 backdrop-blur-3xl bg-black/65 ">
                <h1 className='text-lg text-ellipsis line-clamp-1 font-bold' >
                    {data?.title || data?.name}
                </h1>

                <div className="text-sm text-neutral-500 flex items-center justify-between">
                    <p>
                        {moment(data?.release_date || data?.first_air_date).format("MMMM Do YYYY ")}
                    </p>
                    <p className='bg-black rounded-full px-1 text-sm text-white'>Rating:{Number(data.vote_average).toFixed(1)}</p>
                </div>
            </div>
        </Link>
    )
}

export default Card