import React, {ReactNode, useContext, useState} from "react";
import * as auth from "../auth/auth-provider"
import {User} from "../auth/auth-provider";

const AuthContext = React.createContext<{
    user: User | null,
    login: (form: Form) => Promise<void>,
    register: (form: Form) => Promise<void>,
    logout: () => Promise<void>
} | undefined>(undefined);

AuthContext.displayName = "AuthContext";

interface Form {
    username: string;
    password: string;
}

export const AuthProvider = ({children}: { children:ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)
    const login = (form: Form) => auth.login(form).then(user => setUser(user))
    const register = (form: Form) => auth.register(form).then(user => setUser(user))
    const logout = () => auth.logout().then(() => setUser(null))
    return <AuthContext.Provider children={children} value={{user, login, register, logout}}/>
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context;
};
