import { ImTv } from "react-icons/im";
import { RiSearch2Line } from "react-icons/ri";
import { BiSolidMoviePlay } from "react-icons/bi";
import { HiHome } from "react-icons/hi2";
import { FcAbout } from "react-icons/fc";
import { LiaPhoneVolumeSolid } from "react-icons/lia";



export const navigation = [
    {
        label: "TV Shows",
        href: "tv",
        icon:<ImTv />
    },
    {
        label: "Movies",
        href: "movie",
        icon: <BiSolidMoviePlay />

    },
    {
        label: "About",
        href: "about",
        icon:<FcAbout />
    },
    {
        label: "Contact",
        href: "contact",
        icon: <LiaPhoneVolumeSolid />

    }
];

export const mobileNavigation =[
    {
        label:"Home",
        href: "/",
        icon: <HiHome />
    },
    ...navigation,
    {
        label:"Search",
        href: "/search",
        icon: <RiSearch2Line />
    },
]

