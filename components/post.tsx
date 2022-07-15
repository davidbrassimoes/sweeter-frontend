import { DateTime } from "luxon";
import Link from "../node_modules/next/link";
import { likeHandler } from '../services/like'


export default function Post({ data }) {

    data.map(post => {
        if (post.post == undefined) {
            post.isRepost = false
        }
        if (post.post != undefined) {
            post.isRepost = true
        }
    })

    return (
        <>
            {data.map(post => (
                <div className="post" key={post.isRepost ? `${post.id}_r` : post.id}>
                    <div>
                        <Link href={`../users/${post.user.id}`}>
                            <a><h2 className="user-link"> @{post.user.username}</h2></a>
                        </Link>
                        <h3><i> {DateTime.fromISO(`${post.createdAt}`).toFormat('dd-MM-yyyy HH:mm')} </i></h3>

                    </div>

                    <p> {post.content} </p>
                    <> {post.isRepost ?
                        <>
                            <div className="post">
                                <Link href={`../feed/${post.post.id}`} ><a className="to-repost"><p>{post.post.content}</p></a></Link>
                            </div>
                            <button className="sweet-button">
                                <Link href={`../feed/repost/${post.id}`} ><a>Sweet</a></Link>
                            </button>
                        </>
                        :
                        <button className="sweet-button">
                            <Link href={`../feed/${post.id}`} ><a>Sweet</a></Link>
                        </button>
                    } </>

                </div>

            ))}
        </>
    )

}

