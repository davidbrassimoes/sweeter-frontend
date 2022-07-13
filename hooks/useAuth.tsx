import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { api } from "../services/api";

interface User {
    id: number;
    username: string;
    bio: string;
    email: string;
}

interface AuthResponse {
    user: User;
    token: string;
}

interface AuthContextData {
    user?: User;
    token?: string | null;
    isLoggedIn: boolean;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
}

interface AuthProviderProps {
    children: ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export function AuthProvider(props: AuthProviderProps) {
    const [user, setUser] = useState<User | undefined>();
    const [token, setToken] = useState('');

    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
        } else {
            localStorage.removeItem('token');
        }
    }, [token]);

    async function login(username: string, password: string) {
        try {
            const { data } = await api.post<AuthResponse>('/users/login', { username, password });
            setToken(data.token);
            setUser(data.user)
        } catch (error) {
            throw error;
        }
    }

    function logout() {
        setToken('');
        setUser(null);
        alert("Logged Out!")
    }

    return (
        <AuthContext.Provider value={{ user, token, login, logout, isLoggedIn: !!token }}{...props} />
    )
}

export const useAuth = () => useContext(AuthContext);
export const AuthConsumer = AuthContext.Consumer;