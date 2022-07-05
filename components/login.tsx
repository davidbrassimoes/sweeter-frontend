import { useState } from "react";

export default function LogIn() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const logUser = async (e) => {

        e.preventDefault()

        if (username && password) {

            const res = await fetch('http://localhost:3001/users/login', {
                method: 'POST',
                body: JSON.stringify({
                    username,
                    password
                }),
                headers: {
                    'content-type': 'application/json;charset=UTF-8',
                }
            })

            const data = await res.json()

            console.log(data, "FRONTEND DATA")

            if (data.code === 401) return alert('Bad credentials!')

            if (data.token) return alert(`User @${username} Logged!`)



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
                type="text"
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