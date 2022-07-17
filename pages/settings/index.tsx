import { useEffect, useState } from "react";
import Link from "../../node_modules/next/link";
import { api } from "../../services/api";
import { useAuth } from '../../hooks/useAuth'
import SideBar from "../../components/sidebar"
import { getColor, saveColor } from "../../services/color"

export default function Settings() {
    const [profile, setProfile] = useState(null)
    const [isLoading, setLoading] = useState(false)
    const [color, setColor] = useState('')
    const [editVisible, setEditVisible] = useState(false)
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
    const oldColor = profile.avatarColor

    return (
        <>
            <SideBar />
            <div className="post">
                <h1 className="text-3xl">@{profile.username}: <i>{profile.bio}</i></h1>
                <button onClick={() => setEditVisible(!editVisible)} className="sweet-button">Edit</button>
            </div>
            {editVisible ?
                <>
                    <div className="post">
                        <form className="post userPost">
                            <input className="text-content" type="text" placeholder={`${profile.username}`} />
                            <input className="text-content" type="text" placeholder={`${profile.bio}`} />
                        </form>
                        <button onClick={() => console.log("put")} className="sweet-button">Save</button>
                    </div>
                </>
                :
                null
            }

            <div className="post">
                <h1 className="text-xl">Avatar Color:</h1>
                <div className="avatar" style={{ backgroundColor: oldColor }}>Old</div>
                <div>
                    <button onClick={(e) => setColor(getColor(e))} className="avatar" style={{ backgroundColor: color }}>New</button>
                    <button onClick={() => saveColor(user, color)} className="sweet-button">Set</button>
                </div>
            </div>
            <div className="post">
                <h2 className="text-xl">Users Followed:</h2>
            </div>
            {userFollows.map(x => (
                <div className="post" key={x.id}>
                    <Link href={`users/${x.id}`}><a><i>@{x.username}</i></a></Link>
                    <button onClick={() => console.log("let's see about unfollowing")} className="sweet-button">
                        Unfollow
                    </button>
                </div>
            ))}
            <div className="post">
                <h2 className="text-xl">Tags Followed:</h2>
            </div>
            {tagFollows.map(x => (
                <div className="post" key={x.id}>
                    <Link href={`tags/${x.id}`}><a><i>#{x.content}</i></a></Link>
                    <button onClick={() => console.log("let's see about unfollowing")} className="sweet-button">
                        Unfollow
                    </button>
                </div>
            ))}
        </>
    )
}
