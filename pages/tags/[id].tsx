import { useRouter } from "../../node_modules/next/router";
import { useEffect, useState } from "react";
import { api } from '../../services/api'
import SideBar from "../../components/sidebar";
import Feed from "../../components/feed";
import NoPost from "../../components/no-post";
import Loading from "../../components/loading";
import TagProfile from "../../components/tag-profile";

export default function TagPage() {
    const router = useRouter()
    const { id } = router.query
    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        api.get(`/tags/${id} `).then(({ data }) => {
            setData(data)
            setLoading(false)
        })
    }, [id])

    if (isLoading) return <Loading />
    if (!data) return <NoPost />

    return (
        <>
            <SideBar />
            <TagProfile data={data} />
            <Feed type="by-tag" options={`/${id}`} />
        </>
    )
}