import axios from "axios";
import { useEffect, useState } from "react";

const mapOmdbDetail = (d) => ({
    id: d.imdbID,
    poster_path: d.Poster && d.Poster !== 'N/A' ? d.Poster : null,
    backdrop_path: d.Poster && d.Poster !== 'N/A' ? d.Poster : null,
    title: d.Title,
    original_title: d.Title,
    name: d.Title,
    overview: d.Plot,
    vote_average: d.imdbRating ? Number(d.imdbRating) : 0,
    vote_count: d.imdbVotes ? parseInt(d.imdbVotes.replace(/,/g,'')) : 0,
    release_date: d.Released || d.Year,
    runtime: d.Runtime ? parseInt(d.Runtime) : null,
    status: d.Type,
    popularity: 0,
    credits: { cast: [], crew: [] },
});

const useFetchDetails = (endpoint) => {
    const [data,setData] =useState();
    const [loading,setLoading] =useState(false);

    const fetchData = async()=>{
        try {
            setLoading(true);

            if(!endpoint || !endpoint.startsWith('/')){
                const response = await axios.get(endpoint)
                setData(response.data)
                setLoading(false);
                return;
            }

            const parts = endpoint.split('/').filter(Boolean);

            // credits endpoint not available from OMDB
            if(parts.length >= 3 && parts[2] === 'credits'){
                setData({ cast: [], crew: [] })
                setLoading(false);
                return;
            }

            // detail endpoint pattern /:mediaType/:id
            if(parts.length >= 2){
                const id = parts[1];
                const response = await axios.get('/', { params: { i: id, plot: 'full' }})
                const mapped = mapOmdbDetail(response.data || {});
                setData(mapped)
                setLoading(false);
                return;
            }

            const response = await axios.get(endpoint)
            setData(response.data)
            setLoading(false);

        } catch (error) {
            console.log(error)
            setLoading(false);
        }
    }

    useEffect(()=>{
        fetchData()
    },[endpoint])

    return {data,loading}
}


export default useFetchDetails