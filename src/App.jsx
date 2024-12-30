import { Outlet } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import MobileNavigation from "./components/MobileNavigation"
import axios from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { setBannerData ,setImageURL} from "./store/retroSlice"
import './App.css'




const App = () => {

  const dispatch =useDispatch();


  const fetchTrendingData = async ()=>{
    try {
      const response = await axios.get('/trending/all/week');
      dispatch(setBannerData(response.data.results));

    } catch (error) {
      console.log('error',error);
    }
  }

  const fetchConfiguration = async ()=>{
    try {
      const res = await axios.get("/configuration");
      dispatch(setImageURL(res.data.images.secure_base_url+"original"));
    
    } catch (error) {
      console.log("error",error);
    }
  }

  useEffect(()=>{
    fetchTrendingData();
    fetchConfiguration(); 
  },[])


  return (
    <main className="lg:pb-0 pb-14">
      <Header/>
      <div className="min-h-[90vh]">
        <Outlet/>
      </div>
      <Footer/>
      <MobileNavigation/>
    </main>
  )
}

export default App