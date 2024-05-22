import {
    createBrowserRouter,
    createRoutesFromElements,
    Route
} from "react-router-dom"
// import Layout from "./layout"

import PageNotFound from "./404"
import Layout from "./layout"
import LoginPage from "./registration";

// loaders
import { loginLoader as playerLoginLoader } from "./registration";

// actions
import { loginAction as playerLoginAction } from "./registration";
import ErrorHandling from "./error";

// import { requireAuth } from "./utilis"
// import { requireAuth } from "./utilis"
export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<ErrorHandling />}>
      <Route
        index
        element={<LoginPage />}
        loader={playerLoginLoader}
        action={playerLoginAction}
      />
      <Route path="*" element={<PageNotFound />} />
    </Route>
  )
);