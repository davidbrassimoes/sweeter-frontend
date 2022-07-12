import { FormEvent, useState } from "react";
import { useAuth } from '../hooks/useAuth';

export default function LogIn() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    function reset() {
        setUsername('');
        setPassword('');
    }
    const logUser = async (e: FormEvent) => {
        e.preventDefault()
        if (username && password) {
            try {
                await login(username, password)
                reset()
                alert(`${username} Logged With Success!`)
            } catch (err) {
                alert('Bad Credentials!')
            }
        }
        else return alert("Not Logged!");
    }

    return (
        <form className="log">
            <h1>Log In</h1>
            <hr />
            <input
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="text-content"
                type="text"
                id="username"
                name="username"
                placeholder="username"
                required
            />
            <input
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="text-content"
                type="password"
                id="password"
                name="password"
                placeholder="password"
                required
            />

            <button
                className="sweet-button"
                onClick={logUser}>
                <a>Login</a>
            </button>
        </form>
    )
}