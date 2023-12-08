
import '@fontsource/rubik/400.css'
import '@fontsource/rubik/500.css'
import '@fontsource/rubik/700.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { AuthContextProvider } from './context/AuthContext.jsx';


import { AuthProvider } from "@asgardeo/auth-react";
import { ChakraProvider } from '@chakra-ui/react'
import theme from './theme.js'
import {
  RouterProvider,
} from "react-router-dom";

import router from './routes/mainroutes.jsx'


const config = {
    signInRedirectURL: window.config.signInRedirectURL,
    signOutRedirectURL: window.config.signOutRedirectURL,
    clientID: window.config.clientID,
    baseUrl: window.config.baseUrl,
    scope: window.config.scope,
  }

ReactDOM.createRoot(document.getElementById('root')).render(
 
    <AuthProvider config={config}>
      <ChakraProvider theme={theme}>
        <RouterProvider router={router} />
      </ChakraProvider>
    </AuthProvider>

)
