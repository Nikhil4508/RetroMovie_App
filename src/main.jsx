import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import AppRouting from './routing/AppRouting.jsx'
import axios from 'axios'
import { Provider } from 'react-redux'
import {store} from './store/store.js'

const API_KEY = import.meta.env.VITE_APP_ACCES_TOKEN;
// setup Axios
axios.defaults.baseURL = "https://api.themoviedb.org/3";
axios.defaults.headers.common['Authorization'] = `Bearer ${API_KEY}`;



createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={AppRouting} />
  </Provider>
    
)
