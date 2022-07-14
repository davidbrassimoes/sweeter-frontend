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




export default function SoloPost() {
    const router = useRouter()
    const { id } = router.query
    const { user } = useAuth()
    const [usersForLikes, setUsersForLikes] = useState([])
    const [post, setPost] = useState()
    const [isLoading, setLoading] = useState(false)

    async function likeHandler(e: FormEvent) {
        e.preventDefault()
        const { data } = await api.get(`users/${user.id}`)
        const myUserLikes = data[0].likes
        const myUserLikesId = myUserLikes.map(x => x.id)

        if (myUserLikesId.includes(post.id)) { return alert("Already Liked") }

        const res = await api.put(`users/${user.id}`, { likes: [...myUserLikes, { "id": post.id }] })
        return console.log(res)
    }

    useEffect(() => {
        setLoading(true)
        api.get(`/posts/${id} `).then(({ data }) => {
            setPost(data[0])
        })
        api.get(`/users`).then(({ data }) => {
            setUsersForLikes(data)
            setLoading(false)
        })
    }, [])


    if (!post && usersForLikes.length == 0) return <p>Loading...</p>
    if (!post && !usersForLikes) return <p>Nothing Sweet Here...</p>
    const userLikes = new Array

    usersForLikes.map(user => {
        user.likes.map(like => {
            if (like.id == post.id) {
                userLikes.push(user.id)
            }
        })
    })

    return (
        <>
            <SideBar />
            <div className="post">
                <h2> @{post.user.username} </h2>
                <span>&middot;</span>
                <i> {DateTime.fromISO(`${post.createdAt}`).toFormat('dd-MM-yyyy HH:mm')} </i>
                <p> {post.content} </p>
                <button onClick={likeHandler} className="sweet-button">
                    <a>Like {userLikes.length}</a>
                </button>
                <RepostForm value={post.id} />
            </div>
        </>
    )
}
