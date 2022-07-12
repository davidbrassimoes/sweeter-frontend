import { DateTime } from "luxon";
import Link from "../node_modules/next/link";

export default function Post({ data }) {

    return (
        <>
            {data.map(post => (
                <div className="post" key={post.id}>
                    <h2> @{post.user.username} </h2>
                    <span>&middot;</span>
                    <i> {DateTime.fromISO(`${post.createdAt}`).toFormat('dd-MM-yyyy HH:mm')} </i>
                    <p> {post.content} </p>
                    <button className="sweet-button">
                        <Link href={`/feed/${post.id}`}><a>Sweet</a></Link>
                    </button>
                </div>
            ))}
        </>
    )

}