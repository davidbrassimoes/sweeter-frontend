import { FormEvent, useState } from "react";
import { api } from "../services/api"
import { getColor, saveColor } from "../services/color"

export default function SignUp() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [bio, setBio] = useState('');
    const [email, setEmail] = useState('');
    const [avatarColor, setAvatarColor] = useState('');

    const createUser = async (e: FormEvent) => {

        e.preventDefault()

        if (username && password && bio && email && avatarColor) {

            const { data } = await api.post('/users/create', { username, password, bio, email, avatarColor })
            console.log(data);
            reset()
            return alert(`User @${username} has been created! Welcome! Login above!`)
        }
        else return alert("please fill the form");
    }
    function reset() {
        setUsername('');
        setPassword('');
        setBio('');
        setEmail('');
        setAvatarColor('');
    }
    return (
        <>
            <form className="log">
                <h1>Sign Up</h1>
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
                <input
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="text-content"
                    type="email"
                    id="email"
                    name="email"
                    placeholder="email"
                    required />
                <div className="post">
                    <h1>Choose an Avatar Color</h1>
                    <button
                        type="button"
                        onClick={(e) => setAvatarColor(getColor(e))}
                        className="avatar"
                        style={{ backgroundColor: avatarColor }}>
                        New
                    </button>
                </div>
                <button
                    className="sweet-button"
                    onClick={createUser}>
                    <a>Register</a>
                </button>
            </form>
        </>
    )
}