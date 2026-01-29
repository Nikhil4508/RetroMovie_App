import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Card from "../components/Card";

const SearchPage = () => {
  const location = useLocation();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  // Use URLSearchParams for robust query extraction
  const params = new URLSearchParams(location.search);
  const query = params.get("q") || "";

  const fetchData = async () => {
    if (!query) return;
    try {
      console.log("API Key being used:", import.meta.env.VITE_OMDB_API_KEY);
      console.log("Fetching data with query:", query, "and page:", page);
      const response = await axios.get("/", {
        params: {
          s: query,
          page: page,
          apikey: import.meta.env.VITE_OMDB_API_KEY,
        },
      });

      console.log("API Response:", response.data);

      setData((previous) => [...previous, ...(response.data.Search || [])]);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  useEffect(() => {
    const debounceFetch = setTimeout(() => {
      if (query) {
        setPage(1);
        setData([]);
        fetchData();
      }
    }, 300); // 300ms debounce time

    return () => clearTimeout(debounceFetch); // Cleanup timeout on component unmount or query change
  }, [location?.search, query]);

  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    if (query) {
      fetchData();
    }
  }, [page]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="py-16 px-6">
      <div className="mt-2 mx-1 sticky top-[72px] z-30">
        <input
          type="text"
          placeholder="search here..."
          onChange={(e) => navigate(`/search?q=${e.target.value}`)}
          value={query}
          className="w-full text-lg text-neutral-900   px-4 py-1 rounded-full lg:hidden outline-none"
        />
      </div>

      <div className="container mx-auto ">
        <h2 className="capitalize text-lg lg:text-2xl font-semibold my-4">
          search results
        </h2>

        <div className=" grid grid-cols-[repeat(auto-fit,240px)] gap-10 justify-center lg:justify-start ">
          {data.map((searchData, index) => {
            return (
              <Card
                data={searchData}
                key={searchData.id + "search" + index}
                media_type={searchData.media_type}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
