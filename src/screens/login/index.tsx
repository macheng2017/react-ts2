import {FormEvent} from "react";
import * as auth from "../../auth/auth-provider"

export const LoginScreen = () => {
    const handleLogin = (form: { username: string, password: string }) => {

    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const username = (event.currentTarget[0] as HTMLInputElement).value
        const password = (event.currentTarget[1] as HTMLInputElement).value
        console.log(username, password)
        handleLogin({username, password})
        auth.login({username, password}).then(r => {
            console.log("hao",r)
        })
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
