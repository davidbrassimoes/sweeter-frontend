import { useEffect, useState } from "react"

export default function User() {
    const [users, setUsers] = useState(null)
    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        fetch('http://localhost:3001/users', {
            method: 'GET',
            headers: {
                'content-type': 'application/json;charset=UTF-8',
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

    return (
        <>
            {users.map(user => (
                <>
                    <h1> {user.username} // {user.bio} </h1>
                </>
            ))}
        </>
    )




}

