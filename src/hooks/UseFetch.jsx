import axios from "axios";
import { useEffect, useState } from "react";

const useFetch = (endpoint) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      // Hardcoded OMDb API key for debugging
      const apiKey = "343de578";
      const url = endpoint.includes("?")
        ? `${endpoint}&apikey=${apiKey}`
        : `${endpoint}?apikey=${apiKey}`;
      const response = await axios.get(url);
      console.log("OMDb API response for", url, response.data); // Debug log
      setLoading(false);
      setData(response.data.Search || []); // OMDb returns results in "Search"
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [endpoint]);

  return { data, loading };
};

export default useFetch;
