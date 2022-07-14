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

export function Profile({ profile }) {
    return (
        <>
            <div className="post">
                <h1 className='text-4xl'> Tag: #{profile.content}</h1>
            </div>
        </>
    )
}

export function NoPosts({ profile }) {
    return (
        <h1> Tag #{profile.content} has no posts! </h1>
    )
}

export default function TagProfile() {
    const router = useRouter()
    const { id } = router.query
    const [isLoading, setLoading] = useState(false)
    const [profile, setProfile] = useState()
    const [posts, setPosts] = useState([])

    useEffect(() => {
        setLoading(true)
        api.get(`/tags/${id} `).then(({ data }) => {
            setProfile(data)
            setLoading(false)
        })
        setLoading(true)
        api.get(`/posts`).then(({ data }) => {
            setPosts(data)
            setLoading(false)
        })
    }, [])
    if (isLoading) return <p>Loading...</p>
    if (!profile && !posts) return <p>Nothing Sweet Here...</p>


    const profilePosts = new Array
    posts.map(post => {
        post.tagged.map(x => {
            if (x.id == id) {
                profilePosts.push(post)
            }
        })

    })

    const hasPosts = profilePosts.length !== 0
    console.log("profile", profile);
    console.log("posts", posts);
    console.log("profilePosts", profilePosts);

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