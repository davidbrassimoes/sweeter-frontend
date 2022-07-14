import { DateTime } from "luxon";
import Link from "../node_modules/next/link";

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
                    <i> {DateTime.fromISO(`${post.createdAt}`).toFormat('dd-MM-yyyy HH:mm')} </i>
                    <p> {post.content} </p>
                    <> {post.isRepost ?
                        <div className="post">
                            <Link href={`feed/${post.post.id}`} ><a><i>{post.post.content}</i></a></Link>
                            <button className="sweet-button">
                                <Link href={`feed/repost/${post.id}`} ><a>Sweet</a></Link>
                            </button>
                        </div>
                        :
                        <button className="sweet-button">
                            <Link href={`feed/${post.id}`} ><a>Sweet</a></Link>
                        </button>
                    } </>

                </div>

            ))}
        </>
    )

}

