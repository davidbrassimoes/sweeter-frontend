import { useEffect, useState } from "react";
import Link from "../../node_modules/next/link";
import { api } from "../../services/api";
import { useAuth } from '../../hooks/useAuth'
import SideBar from "../../components/sidebar"


export default function Settings() {
    const [profile, setProfile] = useState(null)
    const [isLoading, setLoading] = useState(false)
    const { user } = useAuth()
    useEffect(() => {
        setLoading(true)
        api.get(`/users/${user.id}`).then(({ data }) => {
            setProfile(data[0])
            setLoading(false)
        })
    }, [])

    if (isLoading) return <p>Loading...</p>
    if (!profile) return <p>No profile data</p>

    const userFollows = profile.followsUser
    const tagFollows = profile.followsTag

    return (
        <>
            <SideBar />
            <h1 className="text-3xl">@{profile.username}: <i>{profile.bio}</i> </h1>
            <h2 className="text-xl">Users Followed:</h2>
            {userFollows.map(x => (
                <div className="post" key={x.id}>
                    <Link href={`users/${x.id}`}><a><i>@{x.username}</i></a></Link>

                </div>
            ))}
            <h2 className="text-xl">Tags Followed:</h2>
            {tagFollows.map(x => (
                <div className="post" key={x.id}>
                    <Link href={`tags/${x.id}`}><a><i>#{x.content}</i></a></Link>
                </div>
            ))}
        </>
    )
}
