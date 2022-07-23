import Post from "./post";
import { useEffect, useState } from "react";
import { api } from '../services/api'
import Icon from "./icon";
import NoPost from "./no-post";
import Loading from "./loading";

export default function Feed({ type, options }) {

    if (options == undefined) { options = "" }

    const [data, setData] = useState([])
    const [isLoading, setLoading] = useState(false)
    let [refresh, setRefresh] = useState(0)

    useEffect(() => {
        setLoading(true)
        api.get(`feed/${type}${options}`).then(({ data }) => {
            setData(data)
            setLoading(false)
        })
    }, [refresh])

    if (isLoading) return <Loading />
    if (data.length == 0) return <NoPost />


    return (
        <>
            <div className="post">
                <button onClick={() => setRefresh(refresh++)}> <Icon name="update" /> </button>
            </div>
            <Post data={data} />

        </>
    )
}
