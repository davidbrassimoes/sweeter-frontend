import Link from "../node_modules/next/link";
import LogOut from "./logout";
import { useAuth } from '../hooks/useAuth'


export default function SideBar() {
    return (
        <>
            <div className="bar">
                <div className="post">
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
                </div>
            </div>
        </>

    )
}