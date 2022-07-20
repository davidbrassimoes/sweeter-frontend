import { FormEvent } from 'react'
import { useAuth } from '../hooks/useAuth'
import Link from '../node_modules/next/link'
import Icon from './icon'

export default function LogOut() {
    const { logout } = useAuth()

    return (

        <button
            name="logout"
            id="logout"
            onClick={logout}
        >
            <Link href="../"><a><Icon name="logout" /></a></Link>
        </button>

    )

}