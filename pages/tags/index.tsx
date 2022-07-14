import { FormEvent, useEffect, useState } from "react"
import SideBar from "../../components/sidebar"
import { useAuth } from '../../hooks/useAuth'
import { api } from '../../services/api'


export default function Tag() {
    const [tags, setTags] = useState(null)
    const [isLoading, setLoading] = useState(false)
    const { user } = useAuth()

    async function followHandler(tag) {
        const { data } = await api.get(`users/${user.id}`)
        const myUserFollows = data[0].followsTag
        console.log("myUserFollows", myUserFollows);
        const myUserFollowsId = myUserFollows.map(x => x.id)
        console.log("myUserFollowsId", myUserFollowsId);

        if (myUserFollowsId.includes(tag.id)) { return alert("Already Followed") }

        const res = await api.put(`users/${user.id}`, { followsTag: [...myUserFollows, { "id": tag.id }] })
        return console.log(res)
    }

    useEffect(() => {
        setLoading(true)
        api.get('/tags').then(({ data }) => {
            setTags(data)
            setLoading(false)
        })
    }, [])

    if (isLoading) return <p>Loading...</p>
    if (!tags) return <p>No profile data</p>

    const activeUser = user.username


    return (
        <>
            <SideBar />
            {tags.map(tag => (
                <div className="post" key={tag.id}>
                    <p className="text-2xl" >
                        <i>#{tag.content}</i>
                    </p>
                    <button onClick={() => followHandler(tag)} className="sweet-button">
                        Follow
                    </button>
                </div>
            ))}
        </>
    )




}

