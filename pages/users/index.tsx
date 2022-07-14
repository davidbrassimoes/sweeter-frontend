import { useEffect, useState } from "react"
import SideBar from "../../components/sidebar"
import { api } from '../../services/api'
import { useAuth } from '../../hooks/useAuth'



export default function User() {
    const [users, setUsers] = useState(null)
    const [isLoading, setLoading] = useState(false)
    const myId = useAuth().user.id

    async function followHandler(user) {
        const { data } = await api.get(`users/${myId}`)
        const myUserFollows = data[0].followsUser
        console.log("myUserFollows", myUserFollows);
        const myUserFollowsId = myUserFollows.map(x => x.id)
        console.log("myUserFollowsId", myUserFollowsId);
        console.log(user);

        if (myUserFollowsId.includes(user.id)) { return alert("Already Followed") }

        const res = await api.put(`users/${myId}`, { followsUser: [...myUserFollows, { "id": user.id }] })
        return console.log(res)
    }

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
                    <button onClick={() => followHandler(user)} className="sweet-button">
                        Follow
                    </button>
                </div>
            ))}
        </>
    )




}

