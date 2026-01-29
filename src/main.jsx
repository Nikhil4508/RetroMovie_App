import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import AppRouting from "./routing/AppRouting.jsx";
import axios from "axios";
import { Provider } from "react-redux";
import { store } from "./store/store.js";

const OMDB_API_KEY = import.meta.env.VITE_OMDB_API_KEY;
// setup Axios for OMDb
axios.defaults.baseURL = "http://www.omdbapi.com/";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={AppRouting} />
  </Provider>,
);
