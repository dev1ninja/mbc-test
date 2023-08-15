import { node } from 'prop-types';
import React from 'react';
import { useLogin } from 'shared/customhooks/useLogin';
import AuthContext from './authContext';

const AuthState = ({ children }) => {
    const { user, setUser, isLoading, veriff } = useLogin();

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                isLoading,
                veriff
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthState;

AuthState.propTypes = {
    children: node.isRequired,
}
