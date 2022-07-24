import Link from "../../../node_modules/next/link";
import { useRouter } from "../../../node_modules/next/router";
import { useEffect, useState } from "react";
import { api } from '../../../services/api'
import SideBar from "../../../components/sidebar";
import { useAuth } from '../../../hooks/useAuth'
import { DateTime } from "luxon";
import { likeRepost, removeLikeRepost } from '../../../services/like'
import Icon from "../../../components/icon";
import Loading from "../../../components/loading";
import NoPost from "../../../components/no-post";


export default function SoloPost() {
    const router = useRouter()
    const { id } = router.query
    const [data, setData] = useState([])
    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        api.get(`/reposts/${id} `).then(({ data }) => {
            setData(data)
            setLoading(false)
        })
    }, [])


    if (isLoading) return <Loading />
    if (data.length == 0) return <NoPost />

    if (data) {
        return (
            <>
                <SideBar />
                <div className="post">
                    <Link href={`../../users/${data.user.id}`}>
                        <a><div className="avatar" style={{ backgroundColor: `${data.user.avatarColor}` }}>{data.user.username.substr(0, 1).toUpperCase()}</div></a>
                    </Link>
                    <Link href={`../../users/${data.user.id}`}>
                        <a><h2 className="user-link"> @{data.user.username}</h2></a>
                    </Link>
                    <i> {DateTime.fromISO(`${data.createdAt}`).toFormat('dd-MM-yyyy HH:mm')} </i>
                </div>
                <div className="post">
                    {
                        data.myUserLikes ?
                            <button onClick={() => removeLikeRepost(data)}>
                                <a> <Icon name="liked" /> {data.likes}</a>
                            </button>
                            :
                            <button onClick={() => likeRepost(data)}>
                                <a> <Icon name="like" /> {data.likes}</a>
                            </button>
                    }
                    <p> {data.content} </p>
                </div>
                <div className="post">
                    <Link href={`../${data.post.id}`}><a className="to-repost">
                        {data.post.content}
                    </a></Link>
                </div>
            </>
        )
    }
}
