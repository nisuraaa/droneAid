import { Navigate } from 'react-router-dom';
import { useAuthContext } from "@asgardeo/auth-react";
import React, { useEffect, useState } from 'react';
import { Flex } from '@chakra-ui/react';
export const PrivateRoute = ({ children, allowedRoles }) => {
    const { state, getBasicUserInfo, signOut } = useAuthContext();
    const [userRole, setUserRole] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      getBasicUserInfo().then((info) => {
        setUserRole(info.applicationRoles);
        setIsLoading(false);
      });
    }, []);
  
    if (isLoading) {
      return <Flex>Loading...</Flex>;
    }
  
    const isAuthorized = state.isAuthenticated && allowedRoles.includes(userRole);
  
    return isAuthorized ? children : <div>Not Authorized</div>;    // return isAuthorized ? children : <Navigate to="/login" />;
  };
  