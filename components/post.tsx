import { DateTime } from "luxon";
import { FormEvent } from "react";
import Link from "../node_modules/next/link";

function repostHandler(e: FormEvent) {
    e.preventDefault()
}
function likeHandler(e: FormEvent) {
    e.preventDefault()

}

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
                <div className="post" key={post.id}>
                    <h2> @{post.user.username} </h2>
                    <span>&middot;</span>
                    <i> {DateTime.fromISO(`${post.createdAt}`).toFormat('dd-MM-yyyy HH:mm')} </i>
                    <p> {post.content} </p>
                    <> {post.isRepost ?
                        <div className="post">
                            <Link href={`feed/${post.post.id}`} ><i><a>{post.post.content}</a></i></Link>
                        </div>
                        :
                        <button onClick={repostHandler} className="sweet-button">
                            <Link href={`/repost/${post.id}`}><a>ReSweet</a></Link>
                        </button>
                    } </>
                    <button onClick={likeHandler} className="sweet-button">
                        <a>Like</a>
                    </button>
                </div>
            ))}
        </>
    )

}