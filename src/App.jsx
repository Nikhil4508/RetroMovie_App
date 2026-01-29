import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MobileNavigation from "./components/MobileNavigation";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setBannerData, setImageURL } from "./store/retroSlice";
import "./App.css";

const App = () => {
  const dispatch = useDispatch();

  const fetchTrendingData = async () => {
    try {
      // Dynamic trending: pick a random popular keyword for the banner
      const trendingKeywords = [
        "avengers",
        "batman",
        "star wars",
        "spider-man",
        "harry potter",
        "jurassic",
        "matrix",
        "transformers",
        "mission impossible",
        "pirates",
      ];
      const randomKeyword =
        trendingKeywords[Math.floor(Math.random() * trendingKeywords.length)];
      const response = await axios.get("/", {
        params: {
          s: randomKeyword,
          apikey: "343de578",
        },
      });
      dispatch(setBannerData(response.data.Search || [])); // OMDb returns results in "Search"
    } catch (error) {
      console.log("error", error);
    }
  };

  // OMDb does not have a configuration endpoint, so this function can be removed or repurposed.
  // For now, we'll leave it as a placeholder.
  const fetchConfiguration = async () => {
    // No equivalent in OMDb
  };

  useEffect(() => {
    fetchTrendingData();
    fetchConfiguration();
  }, []);

  return (
    <main className="lg:pb-0 pb-14">
      <Header />
      <div className="min-h-[90vh]">
        <Outlet />
      </div>
      <Footer />
      <MobileNavigation />
    </main>
  );
};

export default App;
