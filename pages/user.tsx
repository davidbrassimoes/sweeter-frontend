import { useEffect, useState } from "react"

export default function User() {
    const [users, setUsers] = useState(null)
    const [isLoading, setLoading] = useState(false)
    const token = localStorage.getItem("token")

    useEffect(() => {
        setLoading(true)
        fetch('http://localhost:3001/users', {
            method: 'GET',
            headers: {
                'content-type': 'application/json;charset=UTF-8',
                'Authorization': `${token}`
            },
        })
            .then((res) => res.json())
            .then((users) => {
                setUsers(users)
                setLoading(false)
            })
    }, [])

    if (isLoading) return <p>Loading...</p>
    if (!users) return <p>No profile data</p>

    const activeUser = localStorage.getItem("user")
    console.log("ACTIVE USER: ", activeUser);

    return (
        <div>
            <h1>ACTIVE USER {activeUser} </h1>
            <hr />
            {users.map(user => (
                <h1 key={user.id}>
                    {user.username} // {user.bio}
                </h1>
            ))}
        </div>
    )




}

