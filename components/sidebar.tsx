import Link from "../node_modules/next/link";
import LogOut from "./logout";

export default function SideBar() {
    return (
        <div className="bar">
            <button className="sweet-button">
                <Link href="/"><a>Home</a></Link>
            </button>
            <button className="sweet-button">
                <Link href="/feed"><a>Feed</a></Link>
            </button>
            <button className="sweet-button">
                <Link href="/chat"><a>Chat</a></Link>
            </button>
            <button className="sweet-button">
                <Link href="/settings"><a>Settings</a></Link>
            </button>
            <button className="sweet-button">
                <Link href="/user"><a>Users</a></Link>
            </button>
            <LogOut />
        </div>
    )
}