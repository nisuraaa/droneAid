import React, { useEffect } from 'react'
import { useAuthContext } from "@asgardeo/auth-react";
import { useNavigate } from "react-router-dom";
const Overview = () => {
    const navigate = useNavigate();
    const { state, getBasicUserInfo,signOut } = useAuthContext();
    useEffect(() => {
        getBasicUserInfo().then((info) => {
            console.log(info);
        });
    }, []);

    return (
        <>
            <div>Admin Overview</div>
            <button onClick={() => signOut()}>Logout</button>
        </>

    )
}

export default Overview