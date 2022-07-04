import Link from "../node_modules/next/link";

export default function SideBar() {
    return (
        <div className="bar">
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
            <button className="sweet-button">
                <Link href="/sign-up"><a>Sign Up!</a></Link>
            </button>
        </div>
    )
}