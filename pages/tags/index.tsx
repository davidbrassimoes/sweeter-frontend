import { useEffect, useState } from "react"
import SideBar from "../../components/sidebar"
import { useAuth } from '../../hooks/useAuth'
import { api } from '../../services/api'


export default function Tag() {
    const [tags, setTags] = useState(null)
    const [isLoading, setLoading] = useState(false)
    const { user } = useAuth()
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
                    <span>&middot;</span>
                    <button onClick={() => console.log(`I Wanna Follow #${tag.content}`)} className="sweet-button">
                        Follow
                    </button>
                </div>
            ))}
        </>
    )




}

