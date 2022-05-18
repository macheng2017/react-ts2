const tokenKey = 'auth-token';

interface User {
    username: string;
    password: string;
    token: string;
}


const setToken = (user: User) => {
    window.localStorage.setItem(tokenKey, user.token)
}

const getToken = () => {
    return window.localStorage.getItem(tokenKey);
}

export const login = (form: { username: string, password: string }) => {

    return fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(form)
    }).then(
        async res => {
            if (res.ok) {
                setToken( await res.json())
                return res.json()
            }
            return Promise.reject("Login failed "+JSON.stringify(form))
        }
    )
}

export const register = (form: { username: string, password: string }) => {
    return fetch('http://localhost:3001/register', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(form)
    }).then(
        res => {
            if (res.ok) {
                return res.json()
            }
            return Promise.reject(form)
        }
    )
}

export const logout = () => {
    window.localStorage.removeItem(tokenKey);
}
