import UserPost from "../../components/userpost";
import Post from "../../components/post";
import { useEffect, useState } from "react";
import { api } from '../../services/api'
import SideBar from "../../components/sidebar";
import { DateTime } from "luxon";
import Link from "../../node_modules/next/link";
import { sortPostsByDate } from "../../services/sort";

export default function Feed() {
    const [posts, setPosts] = useState([])
    const [reposts, setReposts] = useState([])
    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        api.get('/posts').then(({ data }) => {
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
    if (!posts && !reposts) return <p>Nothing Sweet Here...</p>

    const feed = [...posts, ...reposts]
    sortPostsByDate(feed)

    feed.map(post => {
        if (post.post == undefined) {
            post.isRepost = false
        }
        if (post.post != undefined) {
            post.isRepost = true
        }
    })

    return (
        <>
            <SideBar />
            <UserPost />
            <Post data={feed} />

        </>
    )
}
