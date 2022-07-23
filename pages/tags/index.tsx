import { useEffect, useState } from "react"
import Loading from "../../components/loading"
import NoPost from "../../components/no-post"
import SideBar from "../../components/sidebar"
import TagItem from "../../components/tag-item"
import { api } from '../../services/api'

export default function Tag() {
    const [data, setData] = useState([])
    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        api.get('/tags').then(({ data }) => {
            setData(data)
            setLoading(false)
        })
    }, [])

    if (isLoading) return <Loading />
    if (data.length == 0) return <NoPost />

    return (
        <>
            <SideBar />
            <TagItem data={data} />
        </>
    )
}

