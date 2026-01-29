import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import ExplorePage from "../pages/ExplorePage"
import DetailPage from "../pages/DetailPage"
import SearchPage from "../pages/SearchPage"
import AboutPage from "../pages/AboutPage"
import ContactPage from "../pages/ContactPage"


const AppRouting = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                path: "",
                element: <Home/>
            },
            {
                path: ":mediaType",
                element: <ExplorePage/>
            },{
                path: ":mediaType/:id",
                element: <DetailPage/>
            },{
                path: "search",
                element: <SearchPage/>
            },{
                path: "about",
                element: <AboutPage/>
            },{
                path: "contact",
                element: <ContactPage/>
            }
        ]
    }
]);
export default AppRouting