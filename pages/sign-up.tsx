import { useState } from "react";
import { URL } from "url";
import { useRouter } from "../node_modules/next/router"

export default function SignUp() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [bio, setBio] = useState('');
    const [email, setEmail] = useState('');

    const createUser = async (e) => {

        e.preventDefault()

        if (username && password && bio && email) {

            const res = await fetch('http://localhost:3001/users', {
                method: 'POST',
                body: JSON.stringify({
                    username,
                    password,
                    bio,
                    email
                }),
                headers: {
                    'content-type': 'application/json;charset=UTF-8',
                }
            })
            const data = await res.json()
            console.log(data);

            return alert(`User @${username} has been created! Welcome! Login above!`)

        }
        else return alert("please fill the form");

    }

    return (
        <form className="log">
            <label htmlFor="username">username</label>
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
            <label htmlFor="password">password</label>
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
            <label htmlFor="bio">bio</label>
            <input
                value={bio}
                onChange={e => setBio(e.target.value)}
                className="text-content"
                type="text"
                id="bio"
                name="bio"
                placeholder="bio"
                required
            />
            <label htmlFor="email">email</label>
            <input
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="text-content"
                type="text"
                id="email"
                name="email"
                placeholder="email"
                required />
            <button
                className="sweet-button"
                onClick={createUser}>
                <a>Sweet</a>
            </button>
        </form>
    )
}