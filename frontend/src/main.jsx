
import '@fontsource/rubik/400.css'
import '@fontsource/rubik/500.css'
import '@fontsource/rubik/700.css'

import React from 'react'
import ReactDOM from 'react-dom/client'

import { AuthProvider } from "@asgardeo/auth-react";
import { ChakraProvider } from '@chakra-ui/react'
import theme from './theme.js'
import {
  RouterProvider,
} from "react-router-dom";

import router from './routes/mainroutes.jsx'



const config = {
  signInRedirectURL: window.location.redirectURL,
  signOutRedirectURL: window.location.redirectURL,
  clientID: window.location.clientID,
  baseUrl: window.location.baseUrl,
  scope: window.location.scope,
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider config={config}>
      <ChakraProvider theme={theme}>
        <RouterProvider router={router} />
      </ChakraProvider>
    </AuthProvider>
  </React.StrictMode>,
)
