import { Link, NavLink, useLocation, useNavigate } from "react-router-dom"
import logo from "../assets/images/rtm.png"
import { RiSearch2Line } from "react-icons/ri";
import { PiUserCircleFill } from "react-icons/pi";
import { useEffect, useState } from "react";
import { navigation } from "../constants/Navigation";



const Header = () => {

    const location = useLocation();
    const removeSpace = location?.search?.slice(3)?.split("%20")?.join(" ");
    const [searchinput,setSearchInput]= useState(removeSpace);
    const navigate = useNavigate();


    const handleSubmit = (e) => {
        e.preventDefault();
    }

    useEffect(()=>{
        const timer = setTimeout(() => {
            if(searchinput){
                navigate(`/search?q=${searchinput}`);
            }
        }, 300);
        return () => clearTimeout(timer);
    },[searchinput, navigate]);

    return (
        <header className="fixed top-0 w-full h-16 bg-black bg-opacity-75 z-40">
            <div className="container mx-auto px-6 flex items-center h-full ">
                <Link to={"/"} >
                    <img 
                        src={logo} 
                        alt=""  
                        width={150}
                    />
                </Link>

                <nav className="hidden lg:flex items-center gap-1 ml-6 text-lg">
                    {
                        navigation.map((nav,index)=>{
                            return (
                                <div key={index}>
                                        <NavLink to={nav.href} className={({isActive})=>`px-3 hover:text-neutral-100 duration-300 ${isActive && "text-neutral-100"}`}>
                                            {nav.label}
                                        </NavLink>
                                </div>
                            )
                        })
                    }
                </nav>

                <div className="ml-auto flex items-center gap-4">
                    <form className="flex items-center gap-2" onSubmit={handleSubmit}>
                        <input 
                            type="text" 
                            placeholder="search here..."
                            value={searchinput}
                            onChange={(e)=> setSearchInput(e.target.value)}
                            className="hidden lg:block px-4 py-1 text-xl text-neutral-100 outline-none border-none bg-transparent mr-1"
                        />
                        <button className=" text-neutral-100">
                            <RiSearch2Line  size={30}/>
                        </button>
                    </form>
                    <div className="cursor-pointer active:scale-50 duration-75">
                        <PiUserCircleFill size={35} />
                    </div>
                </div>
            </div>

        </header>
    )
}

export default Header