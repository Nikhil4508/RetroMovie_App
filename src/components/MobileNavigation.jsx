import { NavLink } from "react-router-dom"
import { mobileNavigation } from "../contants/Navigation"

const MobileNavigation = () => {



  return (
    <section className="lg:hidden fixed bottom-0 w-full h-14 bg-black bg-opacity-40 backdrop-blur-3xl z-40">
        <div className="flex items-center justify-between h-full text-neutral-400">
            {mobileNavigation.map((nav,index)=>{
                return(
                    <NavLink 
                        key={nav.label+"mobilenavigation"+index} 
                        to={`${nav.href}`}
                        className={({isActive})=>`px-4 flex h-full items-center flex-col justify-center ${isActive && "text-white"}`}
                        >
                        <div className="text-2xl">
                            {nav.icon}
                        </div>
                        <p className="text-sm">{nav.label}</p>
                    </NavLink>
                )
            })}
        </div>
    </section>
  )
}

export default MobileNavigation