import Link from "../../node_modules/next/link";
import UserPost from "../../components/userpost";
// import * from "../node_modules/luxon"


export default function Feed({ data }) {

    const feed = data.sort((a, b) => {
        const fa = a.createdAt.toLowerCase()
        const fb = b.createdAt.toLowerCase();

        if (fa < fb) {
            return 1;
        }
        if (fa > fb) {
            return -1;
        }
        return 0;
    });

    return (
        <>
            <UserPost></UserPost>
            {data.map(post => (
                <div className="post" key={post.id}>
                    <h2> @{post.user.username} </h2>
                    <span>&middot;</span>
                    <i> {post.createdAt} </i>
                    <p> {post.content} </p>
                    <button className="sweet-button">
                        <Link href={`/feed/${post.id}`}><a>Sweet</a></Link>
                    </button>
                </div>
            ))}
        </>
    )
}

export async function getServerSideProps() {
    const res = await fetch(`http://localhost:3001/posts`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json;charset=UTF-8',
        },
    })
    const data = await res.json()

    return { props: { data } }
}

