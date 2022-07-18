import UserPost from "./userpost";
import Post from "./post";
import { useEffect, useState } from "react";
import { api } from '../services/api'
import SideBar from "./sidebar";
import { DateTime } from "luxon";
import Link from "../node_modules/next/link";
import { sortPostsByDate, getUserFeed } from "../services/feed-filter";
import { useAuth } from "../hooks/useAuth";

export default function Feed() {
    const { user } = useAuth()
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
    const userFeed = getUserFeed(feed, user)
    sortPostsByDate(userFeed)


    return (
        <>
            <div className="post">
                <button className='sweet-button' onClick={() => setRefresh(refresh++)}>Update</button>
            </div>
            <Post data={userFeed} />

        </>
    )
}
