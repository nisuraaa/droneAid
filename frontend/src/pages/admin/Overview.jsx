import React, { useEffect } from 'react'
import { useAuthContext } from "@asgardeo/auth-react";
import { useNavigate } from "react-router-dom";
import { Flex } from '@chakra-ui/react';

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
      TEST PAGE
        </>

    )
}

export default Overview