import React, { useEffect, useState } from 'react'
import { useAuthContext } from "@asgardeo/auth-react"

import { useNavigate } from "react-router-dom";

import {
    Box,
    Image,
    Text,
    Spinner
} from '@chakra-ui/react'

import Logo from '../assets/droneAid.png'


const Login = () => {
    const [isSignedIn, setIsSignedIn] = useState(false);
    const { state, signIn, signOut } = useAuthContext();
    const { getBasicUserInfo,isAuthenticated } = useAuthContext();
    const navigate = useNavigate();
    const [basicUserInfo, setBasicUserInfo] = useState({});

    useEffect( () => {
      console.log(state.isAuthenticated);
      if(state.isAuthenticated){
        getBasicUserInfo().then((info) => {
          setBasicUserInfo(info);
          if (info.applicationRoles === "administrator") {
            navigate("/admin");
          }else if(info.applicationRoles === "pharma")
          {
            navigate("/pharma");
          }
        });
      }
      }, [isAuthenticated]);

    return (

        <Box display="flex" justifyContent="center" flexDirection="column" alignItems="center" w="100vw" h="100vh">

            <Image m="10px" src={Logo} alt="DroneAid Logo" />
            {state.isAuthenticated ? (
                <>
                    <Text m="10px"> Hello {state.username} </Text>
                    <Text m="10px"> Your user role is {basicUserInfo.applicationRoles} </Text>
                    <button onClick={() => signOut()}>Logout</button>
                </>
            ) : (<>
                <Text m="10px">Signing You in...</Text>
                <Spinner />
            </>
            )

            }
        </Box>

    )
}

export default Login