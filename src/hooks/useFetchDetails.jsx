import axios from "axios";
import { useEffect, useState } from "react";

const useFetchDetails = (endpoint) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      // OMDb-specific: always use the OMDb API key and endpoint structure
      const apiKey = "343de578";
      let url = "";
      if (endpoint.startsWith("/?i=") || endpoint.startsWith("?i=")) {
        url = endpoint.startsWith("/") ? endpoint : "/" + endpoint;
        url = `${url}${url.includes("?") ? "&" : "?"}apikey=${apiKey}`;
      } else {
        // fallback: treat as search by title
        url = `/?t=${encodeURIComponent(endpoint.replace(/^\//, ""))}&apikey=${apiKey}`;
      }
      const response = await axios.get(url);
      setLoading(false);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [endpoint]);

  return { data, loading };
};

export default useFetchDetails;
