import {
    createBrowserRouter,
    createRoutesFromElements,
    Route
} from "react-router-dom"
// import Layout from "./layout"

import PageNotFound from "./404"
import Layout from "./layout"
import LoginPage from "./registration"



// import { requireAuth } from "./utilis"
// import { requireAuth } from "./utilis"
export const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<Layout/>}>
    <Route index element={<LoginPage/>}/>
    <Route path="*" element={<PageNotFound/>}/>
    </Route>
))