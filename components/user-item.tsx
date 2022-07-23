import Link from "../node_modules/next/link";
import { followUserHandler } from "../services/follow";
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
                                <button onClick={() => console.log("let's see about unfollowing")} >
                                    <Icon name="user_remove" />
                                </button> :
                                <button onClick={() => followUserHandler(user, myUser)} >
                                    <Icon name="user_add" />
                                </button>
                        }
                    </>
                </div>
            ))}
        </>
    )
}