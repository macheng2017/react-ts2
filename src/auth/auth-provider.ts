const tokenKey = 'auth-token';

export interface User {
    username: string;
    password: string;
    token: string;
}


const handlerUserResponse = (user: User) => {
    window.localStorage.setItem(tokenKey, user.token)
    // 在这里加上返回值之后就可以在调用时直接返回了
    return user
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
                return handlerUserResponse(await res.json())
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
        async res => {
            if (res.ok) {
                return handlerUserResponse(await res.json())
            }
            return Promise.reject(form)
        }
    )
}

export const logout = async () => {
    await window.localStorage.removeItem(tokenKey);
}
