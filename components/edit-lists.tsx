import { useState } from "react";
import Link from "../node_modules/next/link";
import { removeFollowTag, removeFollowUser } from "../services/follow";
import Icon from "./icon";

export default function EditLists({ data }) {
    const [editUsers, setEditUsers] = useState(false)
    const [editTags, setEditTags] = useState(false)

    return (
        <>
            <div className="post">
                <h2 className="text-xl">Users Followed: <i>{data.followsUser.length}</i> </h2>
                <button onClick={() => setEditUsers(!editUsers)}> <Icon name={editUsers ? "toggle_on" : "toggle_off"} /> </button>
            </div>
            {editUsers ?
                data.followsUser.map(x => (
                    <div className="post" key={x.id}>
                        <Link href={`users/${x.id}`}><a><i>@{x.username}</i></a></Link>
                        <button onClick={() => removeFollowUser(x)}>
                            <Icon name="user_remove" />
                        </button>
                    </div>
                ))
                :
                null
            }
            <div className="post">
                <h2 className="text-xl">Tags Followed: <i>{data.followsTag.length}</i> </h2>
                <button onClick={() => setEditTags(!editTags)}> <Icon name={editTags ? "toggle_on" : "toggle_off"} /> </button>
            </div>
            {editTags ?
                data.followsTag.map(x => (
                    <div className="post" key={x.id}>
                        <Link href={`tags/${x.id}`}><a><i>#{x.content}</i></a></Link>
                        <button onClick={() => removeFollowTag(x)} className="sweet-button">
                            Unfollow
                        </button>
                    </div>
                ))
                :
                null
            }
        </>)
}