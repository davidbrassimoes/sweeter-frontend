import { FormEvent } from 'react'
import { useAuth } from '../hooks/useAuth'

export default function LogOut() {
    const { logout } = useAuth()

    return (

        <button
            className="sweet-button"
            name="logout"
            id="logout"
            onClick={logout}
        >
            Logout
        </button>

    )

}