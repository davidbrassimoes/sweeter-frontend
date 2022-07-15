import { FormEvent, useEffect, useState } from "react"
import SideBar from "../../components/sidebar"
import { useAuth } from '../../hooks/useAuth'
import Link from "../../node_modules/next/link"
import { api } from '../../services/api'
import { followTagHandler } from '../../services/follow'

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

    return (
        <>
            <SideBar />
            {tags.map(tag => (
                <div className="post" key={tag.id}>
                    <Link href={`tags/${tag.id}`}><a><i className="text-2xl user-link" >#{tag.content}</i></a></Link>
                    <button onClick={() => followTagHandler(tag, user)} className="sweet-button">
                        Follow
                    </button>
                </div>
            ))}
        </>
    )
}

