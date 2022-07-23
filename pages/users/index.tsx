import { useEffect, useState } from "react"
import SideBar from "../../components/sidebar"
import { api } from '../../services/api'
import UserItem from "../../components/user-item"
import Loading from "../../components/loading"
import NoPost from "../../components/no-post"

export default function User() {
    const [data, setData] = useState([])
    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        api.get('/users').then(({ data }) => {
            setData(data)
            setLoading(false)
        })
    }, [])

    if (isLoading) return <Loading />
    if (data.length == 0) return <NoPost />


    return (
        <>
            <SideBar />
            <UserItem data={data} />
        </>
    )




}

