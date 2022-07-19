import { useEffect, useState } from "react"
import SideBar from "../../components/sidebar"
import { api } from '../../services/api'
import { useAuth } from '../../hooks/useAuth'
import Link from "../../node_modules/next/link"
import { followTagHandler, followUserHandler } from '../../services/follow'
import UserItem from "../../components/user-item"

export default function User() {
    const [users, setUsers] = useState(null)
    const [isLoading, setLoading] = useState(false)
    const myUser = useAuth().user

    useEffect(() => {
        setLoading(true)
        api.get('/users').then(({ data }) => {
            setUsers(data)
            setLoading(false)
        })
    }, [])

    if (isLoading) return <p>Loading...</p>
    if (!users) return <p>No profile data</p>


    return (
        <>
            <SideBar />
            <UserItem myUser={myUser} users={users} />
        </>
    )




}

