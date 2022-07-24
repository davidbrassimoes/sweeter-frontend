import Link from "../node_modules/next/link";
import LogOut from "./logout";

export default function EditProfile({ data }) {
    return (<>
        <div className="post">
            <div>
                <Link href={`../users/${data.id}`}>
                    <a><div className="avatar" style={{ backgroundColor: `${data.avatarColor}` }}>{data.username.substr(0, 1).toUpperCase()}</div></a>
                </Link>
            </div>
            <Link href={`../users/${data.id}`}>
                <a><h1 className="text-xl user-link"> @{data.username}</h1></a>
            </Link>
            <i>{data.followers} {data.followers === 1 ? "follower" : "followers"}</i>
            <LogOut />
        </div>
    </>)
}