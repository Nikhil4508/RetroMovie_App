import axios from "axios";
import { useEffect, useState } from "react"

const mapOmdbItem = (item, media_type = 'movie') => ({
    id: item.imdbID,
    poster_path: item.Poster && item.Poster !== 'N/A' ? item.Poster : null,
    backdrop_path: item.Poster && item.Poster !== 'N/A' ? item.Poster : null,
    title: item.Title,
    name: item.Title,
    overview: item.Plot || '',
    vote_average: item.imdbRating ? Number(item.imdbRating) : 0,
    popularity: 0,
    release_date: item.Released || item.Year,
    media_type,
})

const useFetch = (endpoint)=>{
    const [data,setData] =useState([]);
    const [loading,setLoading] =useState(false);

    const fetchData = async()=>{
        try {
            setLoading(true);

            if(!endpoint || !endpoint.startsWith('/')){
                const response = await axios.get(endpoint)
                setData(response.data?.results || response.data?.Search || response.data || [])
                setLoading(false);
                return;
            }

            const parts = endpoint.split('/').filter(Boolean);

            // Handle search pattern: /search/... with query params
            if(parts[0] === 'search'){
                // try to parse query param from endpoint (e.g. /search/multi?query=abc&page=1)
                const [,] = parts;
                const qs = endpoint.split('?')[1] || '';
                const params = Object.fromEntries(new URLSearchParams(qs));
                const q = params.query || params.q || '';
                if(!q){ setData([]); setLoading(false); return }
                const response = await axios.get('/', { params: { s: q, page: params.page || 1 }})
                const results = response.data?.Search || [];
                setData(results.map(i => mapOmdbItem(i)));
                setLoading(false);
                return;
            }

            // similar / recommendations -> approximate via OMDB searches (OMDB has no similar endpoint)
            if(parts.length >= 3 && (parts[2] === 'similar' || parts[2] === 'recommendations')){
                const id = parts[1];
                // recommendations not supported — return empty
                if(parts[2] === 'recommendations'){
                    setData([]);
                    setLoading(false);
                    return;
                }

                // For 'similar' attempt: fetch details by id, extract title/year and search OMDB
                try {
                    const detailRes = await axios.get('/', { params: { i: id } });
                    const detail = detailRes.data || {};
                    const title = detail.Title || '';
                    const year = detail.Year || '';

                    const keywords = title.split(' ').slice(0, 3).join(' ');
                    const type = parts[0] === 'movie' ? 'movie' : 'series';

                    const searchRes = await axios.get('/', { params: { s: keywords || title || year || 'star', type, page: 1 } });
                    let results = searchRes.data?.Search || [];

                    // also try searching by year if available to diversify
                    if(year && results.length < 6){
                        const yearRes = await axios.get('/', { params: { s: year, type, page: 1 } });
                        results = results.concat(yearRes.data?.Search || []);
                    }

                    // dedupe and filter out original id
                    const seen = new Set();
                    const filtered = [];
                    for(const item of results){
                        if(!item?.imdbID || item.imdbID === id) continue;
                        if(seen.has(item.imdbID)) continue;
                        seen.add(item.imdbID);
                        filtered.push(mapOmdbItem(item, parts[0]));
                        if(filtered.length >= 12) break;
                    }

                    setData(filtered);
                    setLoading(false);
                    return;
                } catch (err){
                    console.log(err);
                    setData([]);
                    setLoading(false);
                    return;
                }
            }

            // Generic movie/tv list endpoints -> map to OMDB search results with varied queries
            if(parts[0] === 'movie' || parts[0] === 'tv'){
                const mediaType = parts[0] === 'movie' ? 'movie' : 'series';
                const endpoint2 = parts[1];
                
                // Use different search terms based on the endpoint to diversify results
                let searchTerm = 'star';
                if(endpoint2 === 'now_playing' || endpoint2 === 'popular') searchTerm = 'action';
                else if(endpoint2 === 'top_rated') searchTerm = 'classic';
                else if(endpoint2 === 'on_the_air') searchTerm = 'drama';
                
                const response = await axios.get('/', { params: { s: searchTerm, type: mediaType, page: 1 }})
                const results = response.data?.Search || [];
                setData(results.map(i => mapOmdbItem(i, parts[0])));
                setLoading(false);
                return;
            }

            // fallback
            const response = await axios.get(endpoint)
            setData(response.data?.results || response.data?.Search || response.data || [])
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


export default useFetch