import Link from "../node_modules/next/link";

export default function NoPost() {
    return (
        <div className="no-post">
            <p className="text-3xl"> <i> Nothing Sweet Here...</i></p>
            <p className="text-3xl"> <i> Start Following</i>
                <Link href="feed"><a className="user-link"> Users</a></Link> and
                <Link href="feed"><a className="user-link"> Tags </a></Link>
            </p>
            <p className="text-3xl"><i>or</i></p>
            <p className="text-3xl"> <i> Check the Latest</i>
                <Link href="feed"><a className="user-link"> SWEETS </a></Link>
            </p>
        </div >
    )
}