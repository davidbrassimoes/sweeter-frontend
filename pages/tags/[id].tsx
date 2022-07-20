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
import { followTagHandler } from "../../services/follow";


function Profile({ profile, followers }) {
    const router = useRouter()
    const { user } = useAuth()
    const { followsTag } = user
    const { id } = router.query

    let followsThisTag = false
    followsTag.map(x => {
        if (x.id === +id) {
            followsThisTag = (x.id === +id)
            console.log("inside", followsThisTag)
        }
    })
    return (
        <>
            <div className="post">
                <h1 className='text-4xl'>#{profile.content}</h1>
                <i>{followers.length} {followers.length === 1 ? "follower" : "followers"}</i>

                <>
                    {
                        followsThisTag ?
                            <button onClick={() => console.log("let's see about unfollowing")} className="sweet-button">
                                Unfollow
                            </button> :
                            <button onClick={() => followTagHandler(profile, user)} className="sweet-button">
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
        <h1> Tag #{profile.content} has no posts! </h1>
    )
}

export default function TagProfile() {
    const router = useRouter()
    const { id } = router.query
    const { user } = useAuth()
    const [isLoading, setLoading] = useState(false)
    const [profile, setProfile] = useState()
    const [posts, setPosts] = useState([])
    const [reposts, setReposts] = useState([])
    const profilePosts = new Array
    const [allUsers, setAllUsers] = useState([])



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


    if (posts) {
        const feed = [...posts, ...reposts]
        sortPostsByDate(feed)
        feed.map(post => {
            post.tagged.map(t => {
                if (t.id == id) {
                    profilePosts.push(post)
                }
            })

        })

    }

    const hasPosts = profilePosts.length !== 0

    const followers = new Array;
    allUsers.map(u => {
        u.followsTag.map(ft => {
            if (ft.id == id) {
                followers.push(u)
            }
        })
    })

    if (profile) {
        return (
            <>
                <SideBar />
                <Profile profile={profile} followers={followers} />
                {hasPosts ? <Post data={profilePosts} myUser={user} usersForLikes={allUsers} /> : <NoPosts profile={profile} />}
            </>
        )
    }
}