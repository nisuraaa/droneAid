import {
    createBrowserRouter,
} from "react-router-dom";
    import { Navigate } from "react-router-dom";
import { PrivateRoute } from "../components/auth/PrivateRoute.jsx";
import Landing from '../pages/Landing.jsx'
import Login from '../pages/Login.jsx'
import Overview from '../pages/admin/Overview.jsx'
import PharmaOverview from '../pages/pharma/Overview.jsx'

import PanelLayout from "../pages/PanelLayout.jsx";
import OrderHistory from "../pages/pharma/OrderHistory.jsx";

const adminRoutes = [
    {
        path: "/admin/fleet",
        label: "My Fleet"
    }
]
const pharmaRoutes = [

    {
        path: "/pharma/create",
        label: "Create Orders"
    },
    {
        path: "/pharma/order-history",
        label: "Order History"
    }
]


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
            <PanelLayout routes={adminRoutes} />
        </PrivateRoute>,
        children: [
            {
                path: '',
                element: <Navigate to="/admin/fleet" replace />,
            },
            {
                path: "fleet",
                element: <Overview />,
            },
        ],
    },
    {
        path: "/pharma",
        element: <PrivateRoute allowedRoles={["pharma"]}>
            <PanelLayout routes={pharmaRoutes} />
        </PrivateRoute>,
        children: [
            {
                path: "create",
                element: <PharmaOverview />,
            },
            {
                path: "order-history",
                element: <OrderHistory />,
            },
            {
                path: '',
                element: <Navigate to="/pharma/create" replace />,
            },
        ],
    },

]);

export default router;