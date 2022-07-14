import { useEffect, useState } from "react"
import SideBar from "../../components/sidebar"
import { api } from '../../services/api'


export default function User() {
    const [users, setUsers] = useState(null)
    const [isLoading, setLoading] = useState(false)
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
                    <p className="text-2xl" >
                        {user.username}
                    </p>
                    <span>&middot;</span>
                    <p className="text-xl">
                        <i>{user.bio}</i>
                    </p>
                    <button onClick={() => console.log(`I Wanna Follow @${user.username}`)} className="sweet-button">
                        Follow
                    </button>
                </div>
            ))}
        </>
    )




}

