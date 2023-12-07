import React from 'react'
import { useAuthContext } from "@asgardeo/auth-react";

const Login = () => {
    const { state, signIn, signOut } = useAuthContext();
    return (
        <div>
            {state.isAuthenticated ? (
                <>
                    <p> Hello {state.username} </p>
                    <button onClick={() => signOut()}>Logout</button>
                </>
            ) : (
                <button onClick={() => signIn()}>Login</button>
            )}
        </div>

    )
}

export default Login