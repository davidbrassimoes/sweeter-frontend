import Link from "../../../node_modules/next/link";
import { useRouter } from "../../../node_modules/next/router";
import UserPost from "../../../components/userpost";
import Post from "../../../components/post";
import { FormEvent, useEffect, useState } from "react";
import { api } from '../../../services/api'
import SideBar from "../../../components/sidebar";
import { useAuth } from '../../../hooks/useAuth'
import { DateTime } from "luxon";
import { likeRepostHandler } from '../../../services/like'


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

    if (post) {
        return (
            <>
                <SideBar />
                <div className="post">
                    <h2> @{post.user.username} </h2>
                    <span>&middot;</span>
                    <i> {DateTime.fromISO(`${post.createdAt}`).toFormat('dd-MM-yyyy HH:mm')} </i>
                    <p> {post.content} </p>
                    <button onClick={() => likeRepostHandler(post, user)} className="sweet-button">
                        <a>Like {userLikes.length}</a>
                    </button>
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
