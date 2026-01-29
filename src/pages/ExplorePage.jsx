import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../components/Card";

const ExplorePage = () => {
  const params = useParams();
  const [pageNo, setPageNo] = useState(1);
  const [data, setData] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  //console.log("params",params.explore);

  const fetchData = async () => {
    try {
      // OMDb: Use 's' for search, and include the API key
      // Set OMDb type param for TV (series) and Movie (movie)
      let typeParam = undefined;
      if (params.explore === "tv") typeParam = "series";
      if (params.explore === "movie") typeParam = "movie";

      const response = await axios.get("/", {
        params: {
          s: params.explore || "batman", // fallback search if param missing
          page: pageNo,
          apikey: import.meta.env.VITE_OMDB_API_KEY,
          ...(typeParam ? { type: typeParam } : {}),
        },
      });

      setData((previous) => {
        // OMDb returns results in "Search" array, fallback to empty array if not present
        return [...previous, ...(response.data.Search || [])];
      });

      // OMDb returns totalResults as a string, fallback to 1 page if not present
      setTotalPage(
        Math.ceil(Number(response.data.totalResults || 0) / 10) || 1,
      );
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      setPageNo((prev) => prev + 1);
    }
  };

  useEffect(() => {
    fetchData();
  }, [pageNo]);

  useEffect(() => {
    setPageNo(1);
    setData([]);
    fetchData();
  }, [params.explore]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="py-16 px-6">
      <div className="container mx-auto ">
        <h2 className="capitalize text-lg lg:text-2xl font-semibold my-4">
          Popular {params.explore}
        </h2>

        <div className=" grid grid-cols-[repeat(auto-fit,240px)] gap-10 justify-center  ">
          {/* lg:justify-start */}
          {data.length === 0 ? (
            <div className="text-white text-center col-span-full">
              No results found.
            </div>
          ) : (
            data.map((exploreData, index) => (
              <Card
                data={exploreData}
                key={(exploreData.imdbID || "noid") + "exploreSection" + index}
                media_type={params.explore}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ExplorePage;
