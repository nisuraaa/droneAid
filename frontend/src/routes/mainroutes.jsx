import {
    createBrowserRouter,
} from "react-router-dom";

import { PrivateRoute } from "../components/auth/PrivateRoute.jsx";
import Landing from '../pages/Landing.jsx'
import Login from '../pages/Login.jsx'
import Overview from '../pages/admin/Overview.jsx'

import PanelLayout from "../pages/PanelLayout.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Landing />,

    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/admin",
        element: <PrivateRoute allowedRoles={["administrator"]}>
           <PanelLayout />
        </PrivateRoute>,
        children: [
            {
                path: "fleet",
                element: <Overview />,
            },
            {
                path: "overview",
                // element: <Overview />,
            },
        ],
    },
    {
        path: "/pharma",
        element: <PrivateRoute allowedRoles={["pharma"]}>
           <PanelLayout />
        </PrivateRoute>,
    },
]);

export default router;