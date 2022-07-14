import { useEffect, useState } from "react";
import Link from "../../node_modules/next/link";
import { api } from "../../services/api";
import { useAuth } from '../../hooks/useAuth'
import SideBar from "../../components/sidebar"


export default function Settings() {
    const [profile, setProfile] = useState(null)
    const [isLoading, setLoading] = useState(false)
    const { user } = useAuth()
    useEffect(() => {
        setLoading(true)
        api.get(`/users/${user.id}`).then(({ data }) => {
            setProfile(data[0])
            setLoading(false)
        })
    }, [])

    if (isLoading) return <p>Loading...</p>
    if (!profile) return <p>No profile data</p>

    console.log(profile)

    return (
        <>
            <SideBar />
            <h1 className="text-5xl">@{profile.username}</h1>
            <i className="text-5xl">{profile.bio}</i>
        </>
    )
}
