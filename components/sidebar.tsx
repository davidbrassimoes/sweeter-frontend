import Link from "../node_modules/next/link";
import LogOut from "./logout";
import { useAuth } from '../hooks/useAuth'


export default function SideBar() {
    const { user } = useAuth()
    const activeUser = user.username
    return (
        <>
            <div className="bar">
                <button className="sweet-button">
                    <Link href="/"><a>Home</a></Link>
                </button>
                <button className="sweet-button">
                    <Link href="/feed"><a>Feed</a></Link>
                </button>
                <button className="sweet-button">
                    <Link href="/users"><a>Users</a></Link>
                </button>
                <button className="sweet-button">
                    <Link href="/tags"><a>Tags</a></Link>
                </button>
                <button className="sweet-button">
                    <Link href="/chat"><a>Chat</a></Link>
                </button>
                <button className="sweet-button">
                    <Link href="/settings"><a>Settings</a></Link>
                </button>
                <div className="post">
                    <p className="text-s user-link"><i>active user:</i><Link href={`../users/${user.id}`}><a>@{activeUser}</a></Link></p>
                    <LogOut />
                </div>
            </div>
        </>

    )
}