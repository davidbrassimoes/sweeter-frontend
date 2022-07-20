import { useEffect, useState } from "react";
import Link from "../../node_modules/next/link";
import { api } from "../../services/api";
import { useAuth } from '../../hooks/useAuth'
import SideBar from "../../components/sidebar"
import { getColor, saveColor } from "../../services/color"
import { saveBio } from "../../services/user-update";
import LogOut from "../../components/logout";
import Icon from "../../components/icon";

export default function Settings() {
    const [profile, setProfile] = useState(null)
    const [isLoading, setLoading] = useState(false)
    const [color, setColor] = useState('')
    const [editVisible, setEditVisible] = useState(false)
    const [bio, setBio] = useState('')
    const [allUsers, setAllUsers] = useState([])
    const { user } = useAuth()

    useEffect(() => {
        setLoading(true)
        api.get(`/users/${user.id}`).then(({ data }) => {
            setProfile(data[0])
            setLoading(false)
        })
        setLoading(true)
        api.get(`/users/`).then(({ data }) => {
            setAllUsers(data)
            setLoading(false)
        })
    }, [])

    if (isLoading) return <p>Loading...</p>
    if (!profile) return <p>No profile data</p>

    const userFollows = profile.followsUser
    const tagFollows = profile.followsTag
    const oldColor = profile.avatarColor

    const followers = new Array;
    allUsers.map(u => {
        u.followsUser.map(fu => {
            if (fu.id == user.id) {
                followers.push(u)
            }
        })
    })

    return (
        <>
            <SideBar />

            <div className="post">
                <div>
                    <Link href={`../users/${profile.id}`}>
                        <a><div className="avatar" style={{ backgroundColor: `${profile.avatarColor}` }}>{profile.username.substr(0, 1).toUpperCase()}</div></a>
                    </Link>
                </div>
                <Link href={`../users/${profile.id}`}>
                    <a><h1 className="text-xl user-link"> @{profile.username}</h1></a>
                </Link>
                <i>{followers.length} {followers.length === 1 ? "follower" : "followers"}</i>
                <LogOut />
            </div>
            <div className="post">
                <h1 className="text-xl">Bio: <i>{profile.bio}</i></h1>
                <button onClick={() => setEditVisible(!editVisible)}> <Icon name={editVisible ? "toggle_on" : "toggle_off"} /> </button>
            </div>
            {editVisible ?
                <>
                    <div className="post">
                        <form className="post userPost">
                            <input onChange={e => setBio(e.target.value)} value={bio} className="text-content" type="text" placeholder={`${profile.bio}`} />
                        </form>
                        <button onClick={() => saveBio(user, bio)}><Icon name="save" /></button>
                    </div>
                    <div className="post">
                        <h1>Avatar Color:</h1>
                        <button onClick={() => alert(`HEX Color Code: ${oldColor}`)} className="sweet-button" style={{ backgroundColor: oldColor }}>Current</button>
                        <button onClick={(e) => setColor(getColor(e))} className="sweet-button" style={{ backgroundColor: color }}>New</button>
                        <button onClick={() => saveColor(user, color)}><Icon name="save" /></button>
                    </div>
                </>
                :
                null
            }


            <div className="post">
                <h2 className="text-xl">Users Followed: {userFollows.length} </h2>
            </div>
            {userFollows.map(x => (
                <div className="post" key={x.id}>
                    <Link href={`users/${x.id}`}><a><i>@{x.username}</i></a></Link>
                    <button onClick={() => console.log("let's see about unfollowing")}>
                        <Icon name="user_remove" />
                    </button>
                </div>
            ))}
            <div className="post">
                <h2 className="text-xl">Tags Followed: {tagFollows.length} </h2>
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
