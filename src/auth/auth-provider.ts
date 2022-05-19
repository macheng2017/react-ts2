const tokenKey = 'auth-token';

export interface User {
    id: string
    name: string;
    password: string;
    token: string;
}

// (user: User) 这种写法拿到的是带 一个key的对象 eg {"user":{"id":193415941,"name":"abc","token":"MTkzNDE1OTQx"}}
// 而使用({user}:{user:User}) 这种写法拿到的是一个对象，不带key 例如{"id":193415941,"name":"abc","token":"MTkzNDE1OTQx"}
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
                // console.log(await res.json())
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
