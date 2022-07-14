import { FormEvent } from 'react'
import { useAuth } from '../hooks/useAuth'
import Link from '../node_modules/next/link'

export default function LogOut() {
    const { logout } = useAuth()

    return (

        <button
            className="sweet-button"
            name="logout"
            id="logout"
            onClick={logout}
        >
            <Link href="./"><a>Logout</a></Link>
        </button>

    )

}