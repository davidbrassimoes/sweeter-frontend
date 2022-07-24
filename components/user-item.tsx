import Link from "../node_modules/next/link";
import { followUser, removeFollowUser } from "../services/follow";
import Icon from "./icon";

export default function UserItem({ data }) {
    const { myUser, users } = data

    return (
        <>
            {users.map(user => (
                <div className="post" key={user.id}>
                    <Link href={`../users/${user.id}`}>
                        <a><h2 className="user-link text-2xl"> @{user.username}</h2></a>
                    </Link>
                    <p className="text-xl">
                        <i>{user.bio}</i>
                    </p>
                    <>
                        {
                            user.followsThisUser ?
                                <button onClick={() => removeFollowUser(user)} >
                                    <Icon name="user_remove" />
                                </button> :
                                <button onClick={() => followUser(user)} >
                                    <Icon name="user_add" />
                                </button>
                        }
                    </>
                </div>
            ))}
        </>
    )
}