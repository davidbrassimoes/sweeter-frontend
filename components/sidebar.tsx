import Link from "../node_modules/next/link";
import LogOut from "./logout";
import { useAuth } from '../hooks/useAuth'
import Icon from "./icon";



export default function SideBar() {
    return (
        <>
            <div className="bar">
                <div className="post">
                    <Link href="/"><a><Icon name="home" /></a></Link>
                    <Link href="/feed"><a><Icon name="world" /></a></Link>
                    <Link href="/users"><a><Icon name="users" /></a></Link>
                    <Link href="/tags"><a><Icon name="tag" /></a></Link>
                    <Link href="/chat"><a><Icon name="chat" /></a></Link>
                    <Link href="/settings"><a><Icon name="settings" /></a></Link>
                </div>
            </div>
        </>

    )
}