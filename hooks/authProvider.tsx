import axios from 'axios';
import { createContext } from 'react';
import router from 'next/router';
import { api } from '../services/api';
const AuthContext = createContext();

export const getUser = async (ctx) => {
    return await api.get('/token').then((response) => {
        if (response.data) {
            return { status: 'SIGNED_IN', user: response.data };
        } else {
            return { status: 'SIGNED_OUT', user: null };
        }
    })
        .catch((error) => {
            return { status: 'SIGNED_OUT', user: null };
        });
};

export const AuthProvider = (props) => {
    const auth = props.myAuth || { status: 'SIGNED_OUT', user: null };
    const login = async (username, password) => {
        // Use any auth service methods here
        return await 
    };
    const register = async (email, password) => {
        return await 
    };
    const logout = async () => {
        return await 
    };
    return <AuthContext.Provider value={{ auth, logout, register, login }} {...props} />;
};
export const useAuth = () => React.useContext(AuthContext);
export const AuthConsumer = AuthContext.Consumer;
