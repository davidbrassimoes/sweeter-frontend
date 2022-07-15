import { useEffect, useState } from "react"
import SideBar from "../../components/sidebar"
import { api } from '../../services/api'
import { useAuth } from '../../hooks/useAuth'
import Link from "../../node_modules/next/link"
import { followTagHandler, followUserHandler } from '../../services/follow'

export default function User() {
    const [users, setUsers] = useState(null)
    const [isLoading, setLoading] = useState(false)
    const myId = useAuth().user.id

    useEffect(() => {
        setLoading(true)
        api.get('/users').then(({ data }) => {
            setUsers(data)
            setLoading(false)
        })
    }, [])

    if (isLoading) return <p>Loading...</p>
    if (!users) return <p>No profile data</p>



    return (
        <>
            <SideBar />
            {users.map(user => (
                <div className="post" key={user.id}>
                    <Link href={`../users/${user.id}`}>
                        <a><h2 className="user-link text-2xl"> @{user.username}</h2></a>
                    </Link>
                    <p className="text-xl">
                        <i>{user.bio}</i>
                    </p>
                    <button onClick={() => followUserHandler(user, myId)} className="sweet-button">
                        Follow
                    </button>
                </div>
            ))}
        </>
    )




}

