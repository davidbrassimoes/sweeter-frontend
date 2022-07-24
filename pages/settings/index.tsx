import { useEffect, useState } from "react";
import { api } from "../../services/api";
import SideBar from "../../components/sidebar"
import NoPost from "../../components/no-post";
import Loading from "../../components/loading";
import EditUser from "../../components/edit-user";
import EditLists from "../../components/edit-lists";
import EditProfile from "../../components/edit-profile";

export default function Settings() {
    const [data, setData] = useState([])
    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        api.get(`/settings`).then(({ data }) => {
            setData(data)
            setLoading(false)
        })
    }, [])

    if (isLoading) return <Loading />
    if (data.length == 0) return <NoPost />

    return (
        <>
            <SideBar />
            <EditProfile data={data} />
            <EditUser data={data} />
            <EditLists data={data} />
        </>
    )
}
