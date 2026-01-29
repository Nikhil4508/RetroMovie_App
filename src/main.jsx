import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import AppRouting from './routing/AppRouting.jsx'
import axios from 'axios'
import { Provider } from 'react-redux'
import {store} from './store/store.js'

// Use OMDB API instead of TMDB. Accept env var or fallback to provided key.
const API_KEY = import.meta.env.VITE_APP_OMDB_API_KEY || import.meta.env.VITE_APP_API_KEY || '343de578';

// setup Axios for OMDB
axios.defaults.baseURL = 'https://www.omdbapi.com/';
axios.defaults.params = axios.defaults.params || {};
axios.defaults.params.apikey = API_KEY;



createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={AppRouting} />
  </Provider>
    
)
