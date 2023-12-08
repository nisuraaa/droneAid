import {
    createBrowserRouter,
} from "react-router-dom";

import { PrivateRoute } from "../components/auth/PrivateRoute.jsx";
import Landing from '../pages/Landing.jsx'
import Login from '../pages/Login.jsx'
import Overview from '../pages/admin/Overview.jsx'

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
            <Overview />
        </PrivateRoute>,
    },
    {
        path: "/pharma",
        element: <PrivateRoute allowedRoles={["pharma"]}>
            <Overview />
        </PrivateRoute>,
    },
]);

export default router;