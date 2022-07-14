import Link from "../../../node_modules/next/link";
import { useRouter } from "../../../node_modules/next/router";
import UserPost from "../../../components/userpost";
import Post from "../../../components/post";
import { FormEvent, useEffect, useState } from "react";
import { api } from '../../../services/api'
import SideBar from "../../../components/sidebar";
import { useAuth } from '../../../hooks/useAuth'



export default function SoloPost() {
    const router = useRouter()
    const { id } = router.query
    const { user } = useAuth()
    const [likes, setLikes] = useState(0)
    const [post, setPost] = useState()
    const [isLoading, setLoading] = useState(false)

    async function likeHandler(e: FormEvent) {
        e.preventDefault()
        const res = await api.put(`users/${user.id}`, { likes: [{ "id": post.id }] })
        return console.log(res)
    }

    async function getLikes() {
        const users = await api.get(`/users`)
        const userLikes = new Array
        return users.map(user => {
            user.likes.map(like => {
                if (like.id.includes(post.id)) {
                    userLikes.push(user.id)
                    setLikes(userLikes.length)
                }
            })
        })

    }

    useEffect(() => {
        setLoading(true)
        api.get(`/reposts/${id} `).then(({ data }) => {
            setPost(data[0])
            getLikes()
        })
        setLoading(false)
    }, [])

    if (isLoading) return <p>Loading...</p>
    if (!post) return <p>Nothing Sweet Here...</p>

    return (
        <>
            <SideBar />
            <h1> {post.user.username} </h1>
            <h1> {post.content} </h1>
            <button onClick={likeHandler} className="sweet-button">
                <a>Like {likes}</a>
            </button>
            <p>  </p>
        </>
    )
}
