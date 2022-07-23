import Link from "../../../node_modules/next/link";
import { useRouter } from "../../../node_modules/next/router";
import { FormEvent, useEffect, useState } from "react";
import { api } from '../../../services/api'
import SideBar from "../../../components/sidebar";
import { useAuth } from '../../../hooks/useAuth'
import { DateTime } from "luxon";
import { likeRepostHandler } from '../../../services/like'
import Icon from "../../../components/icon";


export default function SoloPost() {
    const router = useRouter()
    const { id } = router.query
    const { user } = useAuth()
    const [usersForLikes, setUsersForLikes] = useState([])
    const [post, setPost] = useState()
    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        api.get(`/reposts/${id} `).then(({ data }) => {
            setPost(data[0])
            setLoading(false)
        })
        setLoading(true)
        api.get(`/users`).then(({ data }) => {
            setUsersForLikes(data)
            setLoading(false)
        })
    }, [])


    if (isLoading) return <p>Loading...</p>
    if (!post) return <p>Nothing Sweet Here...</p>
    const userLikes = new Array

    usersForLikes.map(u => {
        u.likesRepost.map(like => {
            if (like.id == post.id) {
                userLikes.push(u.id)
            }
        })
    })

    post.myUserLikes = false
    user.likesRepost.map(l => {
        if (l.id == post.id) {
            post.myUserLikes = true
        }
    })

    if (post) {
        return (
            <>
                <SideBar />
                <div className="post">
                    <Link href={`../../users/${post.user.id}`}>
                        <a><div className="avatar" style={{ backgroundColor: `${post.user.avatarColor}` }}>{post.user.username.substr(0, 1).toUpperCase()}</div></a>
                    </Link>
                    <Link href={`../../users/${post.user.id}`}>
                        <a><h2 className="user-link"> @{post.user.username}</h2></a>
                    </Link>
                    <i> {DateTime.fromISO(`${post.createdAt}`).toFormat('dd-MM-yyyy HH:mm')} </i>
                </div>
                <div className="post">
                    <button onClick={() => likeRepostHandler(post, user)}>
                        <a> <Icon name={post.myUserLikes ? "liked" : "like"} /> {userLikes.length}</a>
                    </button>
                    <p> {post.content} </p>
                </div>
                <div className="post">
                    <Link href={`../${post.post.id}`}><a className="to-repost">
                        {post.post.content}
                    </a></Link>
                </div>
            </>
        )
    }
}
