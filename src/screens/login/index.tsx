import {FormEvent} from "react";
import {useAuth} from "../../context/auth-context";

export const LoginScreen = () => {
    const {user, login} = useAuth()

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const username = (event.currentTarget[0] as HTMLInputElement).value
        const password = (event.currentTarget[1] as HTMLInputElement).value
        console.log(username, password)
        login({username, password}).then(r => {
            console.log("hao", r)
        })
    }
    return (<form onSubmit={handleSubmit}>
        {
            user ? "欢迎: " + JSON.stringify(user) : "not logged in"
        }
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
