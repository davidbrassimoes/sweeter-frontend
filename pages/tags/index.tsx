import { FormEvent, useEffect, useState } from "react"
import SideBar from "../../components/sidebar"
import TagItem from "../../components/tag-item"
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
            <TagItem user={user} tags={tags} />
        </>
    )
}

