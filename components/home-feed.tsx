import UserPost from "./userpost";
import Post from "./post";
import { useEffect, useState } from "react";
import { api } from '../services/api'
import SideBar from "./sidebar";
import { DateTime } from "luxon";
import Link from "../node_modules/next/link";
import { sortPostsByDate, getUserFeed } from "../services/feed-filter";
import { useAuth } from "../hooks/useAuth";
import Icon from "./icon";

export default function Feed() {
    const { user } = useAuth()
    const [posts, setPosts] = useState([])
    const [reposts, setReposts] = useState([])
    const [usersForLikes, setUsersForLikes] = useState([])
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
        setLoading(true)
        api.get(`/users`).then(({ data }) => {
            setUsersForLikes(data)
            setLoading(false)
        })
    }, [refresh])


    if (isLoading) return <p>Loading...</p>

    const feed = [...posts, ...reposts]
    const userFeed = getUserFeed(feed, user)
    sortPostsByDate(userFeed)

    if (userFeed.length == 0) return (
        <div className="no-post">
            <p className="text-3xl"> <i> Nothing Sweet Here...</i></p>
            <p className="text-3xl"> <i> Start Following</i>
                <Link href="feed"><a className="user-link"> Users</a></Link> and
                <Link href="feed"><a className="user-link"> Tags </a></Link>
            </p>
            <p className="text-3xl"><i>or</i></p>
            <p className="text-3xl"> <i> Check the Latest</i>
                <Link href="feed"><a className="user-link"> SWEETS </a></Link>
            </p>
        </div >
    )

    return (
        <>
            <div className="post">
                <button onClick={() => setRefresh(refresh++)}> <Icon name="update" /> </button>
            </div>
            <Post data={userFeed} usersForLikes={usersForLikes} myUser={user} />

        </>
    )
}
