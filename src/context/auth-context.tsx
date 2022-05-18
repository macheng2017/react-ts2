import React, {useContext, useState} from "react";
import * as auth from "../auth/auth-provider"

const AuthContext = React.createContext(undefined);

AuthContext.displayName = "AuthContext";

interface Form {
    username: string;
    password: string;
}

export const AuthProvider = () => {
    const [user, setUser] = useState(null)
    const login = (form: Form) => auth.login(form)
    const register = (form: Form) => auth.register(form)
    const logout = () => auth.logout()
    return <AuthContext.Provider value={{user,login,register,logout}}></AuthContext.Provider>
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context;
};
