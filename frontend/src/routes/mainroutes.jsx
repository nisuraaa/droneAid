import {
    createBrowserRouter,
} from "react-router-dom";


import Landing from '../pages/Landing.jsx'
import Login from '../pages/Login.jsx'

const router = createBrowserRouter([
    {
        path: "/",
        element: <Landing />,

    },
    {
        path: "/login",
        element: <Login />,
    },
]);

export default router;