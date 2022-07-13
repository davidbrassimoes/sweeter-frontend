import Link from "../../node_modules/next/link";
import { useRouter } from "../../node_modules/next/router";
import Post from "../../components/post";
import { useEffect, useState } from "react";
import { api } from '../../services/api'
import SideBar from "../../components/sidebar";


export default function SoloPost() {
    const router = useRouter()
    const { id } = router.query
    const [post, setPost] = useState()
    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        api.get(`/posts/${id} `).then(({ data }) => {
            setPost(data)
        })
        setLoading(false)
    }, [])

    if (isLoading) return <p>Loading...</p>
    if (!post) return <p>Nothing Sweet Here...</p>

    console.log("detail data", post);

    return (
        <>
            <SideBar></SideBar>
            <Post data={post}></Post>
        </>
    )
}
