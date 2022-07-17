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
    let [refresh, setRefresh] = useState(0)


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
    }, [refresh])


    if (isLoading) return <p>Loading...</p>
    if (!posts && !reposts) return <p>Nothing Sweet Here...</p>

    const feed = [...posts, ...reposts]
    sortPostsByDate(feed)

    return (
        <>
            <button className='sweet-button' onClick={() => setRefresh(refresh++)}>Update</button>
            <SideBar />
            <UserPost />
            <Post data={feed} />

        </>
    )
}
