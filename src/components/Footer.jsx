import logo from "../assets/images/rtm.png"
import { Link } from 'react-router-dom'


const Footer = () => {


  return (
    <footer 
      className='bg-neutral-600 bg-opacity-30 text-neutral-400 p-4 flex flex-col justify-center items-center'
    >
      <div className="w-full mx-auto flex items-center gap-2">
        <span className="w-full h-1 bg-neutral-400 rounded-full" ></span>
        <img 
          width={150}
          src={logo}
          alt="logo" 
        />
        <span className="w-full h-1 bg-neutral-400 rounded-full"></span>
      </div>

      <div className="flex gap-4 flex-wrap py-2 justify-center  text-lg lg:text-xl">
        <Link to={"/tv"} className="hover:text-white duration-300">TV Shows </Link>
        <Link to={"/movie"} className="hover:text-white duration-300">Movies</Link>
        <Link to={"/about"} className="hover:text-white duration-300">About</Link>
        <Link to={"/contact"} className="hover:text-white duration-300">Contact</Link>
      </div>
      
      <div className="">
        <p>Created by Nikhil Rathod </p>
      </div>
    </footer>
  )
}

export default Footer