import Link from "../node_modules/next/link";
import LogOut from "./logout";
import { useAuth } from '../hooks/useAuth'
import Icon from "./icon";
import { useRouter } from "../node_modules/next/router";

export default function SideBar() {

    const { asPath } = useRouter()

    return (
        <>
            <div className="bar">
                <div className="post">
                    <Link href="/"><a><Icon name="home" /></a></Link>
                    <Link href="/feed"><a><Icon name="feed" /></a></Link>
                    <Link href="/users"><a><Icon name="users" /></a></Link>
                    <Link href="/tags"><a><Icon name="tags" /></a></Link>
                    <Link href="/inbox"><a><Icon name="inbox" /></a></Link>
                    <Link href="/settings"><a><Icon name="settings" /></a></Link>
                </div>
            </div>
        </>

    )
}