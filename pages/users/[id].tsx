import Link from "../../node_modules/next/link";
import { useRouter } from "../../node_modules/next/router";
import UserPost from "../../components/userpost";
import Post from "../../components/post";
import { FormEvent, useEffect, useState } from "react";
import { api } from '../../services/api'
import SideBar from "../../components/sidebar";
import { useAuth } from '../../hooks/useAuth'
import RepostForm from "../../components/repost";
import { DateTime } from "luxon";
import { sortPostsByDate } from "../../services/feed-filter";
import { followUserHandler } from "../../services/follow";

export function Profile({ profile, followers }) {
    const router = useRouter()
    const { user } = useAuth()
    const { followsUser } = user
    const { id } = router.query

    let followsThisUser = false
    followsUser.map(x => {
        if (x.id === +id) {
            followsThisUser = (x.id === +id)
        }
    })
    return (
        <>
            <div className="post">
                <div className="avatar" style={{ backgroundColor: `${profile.avatarColor}` }}>{profile.username.substr(0, 1).toUpperCase()}</div>
                <h1 className='text-4xl'>@{profile.username}</h1>
                <i>{followers.length} {followers.length === 1 ? "follower" : "followers"}</i>
            </div>
            <div className="post">
                <i className='text-2xl pl-5'>{profile.bio}</i>
                <>
                    {
                        followsThisUser ?
                            <button onClick={() => console.log("let's see about unfollowing")} className="sweet-button">
                                Unfollow
                            </button> :
                            <button onClick={() => followUserHandler(profile, user)} className="sweet-button">
                                Follow
                            </button>
                    }
                </>
            </div>
        </>
    )
}

export function NoPosts({ profile }) {
    return (
        <div className="no-post text-2xl"> User @{profile.username} hasn't posted yet! </div>
    )
}

export default function UserProfile() {
    const router = useRouter()
    const { id } = router.query
    const [isLoading, setLoading] = useState(false)
    const [profile, setProfile] = useState()
    const [posts, setPosts] = useState([])
    const [reposts, setReposts] = useState([])
    const [allUsers, setAllUsers] = useState([])

    useEffect(() => {
        setLoading(true)
        api.get(`/users/${id} `).then(({ data }) => {
            setProfile(data[0])
            setLoading(false)
        })
        setLoading(true)
        api.get(`/posts`).then(({ data }) => {
            setPosts(data)
            setLoading(false)
        })
        setLoading(true)
        api.get('/reposts').then(({ data }) => {
            setReposts(data)
            setLoading(false)
        })
        setLoading(true)
        api.get('/users').then(({ data }) => {
            setAllUsers(data)
            setLoading(false)
        })
    }, [])
    if (isLoading) return <p>Loading...</p>
    if (!profile) return <p>Nothing Sweet Here...</p>

    const profilePosts = new Array
    const feed = [...posts, ...reposts]
    sortPostsByDate(feed)
    feed.map(post => {
        if (post.user.id == id) {
            profilePosts.push(post)
        }
    })

    const hasPosts = profilePosts.length !== 0

    const followers = new Array;
    allUsers.map(u => {
        u.followsUser.map(fu => {
            if (fu.id == id) {
                followers.push(u)
            }
        })
    })

    if (profile) {
        return (
            <>
                <SideBar />
                <Profile profile={profile} followers={followers} />
                {hasPosts ? <Post data={profilePosts} /> : <NoPosts profile={profile} />}
            </>
        )
    }
}