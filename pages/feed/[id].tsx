import Link from "../../node_modules/next/link";
import { useRouter } from "../../node_modules/next/router";


export default function Post(data) {
    const router = useRouter()
    const { id } = router.query
    console.log(data, "test");
    console.log(data.data, "test 2");
    const post = data.data.find(post => post.id == id)
    console.log(post, "test 3");

    return (
        <>
            {
                <div className="post">
                    <h2> @{post.user.username} </h2>
                    <span>&middot;</span>
                    <i> {post.createdAt} </i>
                    <p> {post.content} </p>
                    <button className="sweet-button">
                        <Link href="/feed"><a>Sweet</a></Link>
                    </button>
                </div>
            }
        </>
    )
}

export async function getServerSideProps() {
    const res = await fetch(`http://localhost:3001/posts/`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json;charset=UTF-8',
        },
    })
    const data = await res.json()


    return { props: { data } }
}

