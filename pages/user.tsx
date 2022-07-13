import { useEffect, useState } from "react"
import { useAuth } from '../hooks/useAuth'
import { api } from '../services/api'


export default function User() {
    const [users, setUsers] = useState(null)
    const [isLoading, setLoading] = useState(false)
    const { user } = useAuth()
    useEffect(() => {
        setLoading(true)
        api.get('/users').then(({ data }) => {
            setUsers(data)
            setLoading(false)
        })
    }, [])

    if (isLoading) return <p>Loading...</p>
    if (!users) return <p>No profile data</p>

    const activeUser = user.username

    return (
        <div>
            <h1>ACTIVE USER @{activeUser} </h1>
            <hr />
            {users.map(user => (
                <h1 key={user.id}>
                    {user.username} // {user.bio}
                </h1>
            ))}
        </div>
    )




}

