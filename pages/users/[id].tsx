import { useRouter } from "../../node_modules/next/router";
import { useEffect, useState } from "react";
import { api } from '../../services/api'
import SideBar from "../../components/sidebar";
import Feed from "../../components/feed";
import Loading from "../../components/loading";
import NoPost from "../../components/no-post";
import UserProfile from "../../components/user-profile";


export default function UserPage() {
    const router = useRouter()
    const { id } = router.query
    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        api.get(`/users/${id} `).then(({ data }) => {
            setData(data)
            setLoading(false)
        })
    }, [id])

    if (isLoading) return <Loading />
    if (!data) return <NoPost />

    return (
        <>
            <SideBar />
            <UserProfile data={data} />
            <Feed type="by-user" options={`/${id}`} />
        </>
    )
}