import {FormEvent} from "react";

export const LoginScreen = () => {
    const handleLogin = (form: { username: string, password: string }) => {
        fetch('http://localhost:3001/login', {
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

const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const username = (event.currentTarget[0] as HTMLInputElement).value
    const password = (event.currentTarget[1] as HTMLInputElement).value
    console.log(username, password)
    handleLogin({username, password})
}
return (<form onSubmit={handleSubmit}>
    <div>
        <label htmlFor={"username"}>用户名</label>
        <input type="text"/>
    </div>
    <div>
        <label htmlFor={"password"}>密码</label>
        <input type="password"/>
    </div>
    <button type={"submit"}>登录</button>
</form>)

}
