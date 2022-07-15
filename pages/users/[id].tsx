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
import { sortPostsByDate } from "../../services/sort";

export function Profile({ profile }) {
    return (
        <>
            <div className="post">
                <h1 className='text-4xl'> User: @{profile.username}</h1>
            </div>
            <div className="post">
                <h1 className='text-2xl'> Bio: <i>{profile.bio}</i></h1>
            </div>
        </>
    )
}

export function NoPosts({ profile }) {
    return (
        <h1> User @{profile.username} hasn't posted yet! </h1>
    )
}

export default function UserProfile() {
    const router = useRouter()
    const { id } = router.query
    const [isLoading, setLoading] = useState(false)
    const [profile, setProfile] = useState()
    const [posts, setPosts] = useState([])
    const [reposts, setReposts] = useState([])

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

    if (profile) {
        return (
            <>
                <SideBar />
                <Profile profile={profile} />
                {hasPosts ? <Post data={profilePosts} /> : <NoPosts profile={profile} />}
            </>
        )
    }
}