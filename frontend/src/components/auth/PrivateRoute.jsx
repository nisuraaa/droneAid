import { Navigate } from 'react-router-dom';
import { useAuthContext } from "@asgardeo/auth-react";
import React, { useEffect, useState } from 'react';

export const PrivateRoute = ({ children, allowedRoles }) => {
    
    const { state, getBasicUserInfo, signOut } = useAuthContext();
    const [userRole, setUserRole] = useState({});
    useEffect(() => {
        getBasicUserInfo().then((info) => {
            setUserRole(info.applicationRoles);
        });
    }, []);
    const isAuthorized = state.isAuthenticated && allowedRoles.includes(userRole)
    console.log("userRole", userRole);
    console.log("isAuthorized", isAuthorized);
    return isAuthorized ? children : <Navigate to="/login" />;
    // return children;
};