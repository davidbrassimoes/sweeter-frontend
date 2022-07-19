import Link from "../node_modules/next/link";
import { followTagHandler } from "../services/follow";
import Icon from "./icon";

export default function TagItem({ user, tags }) {
    const { followsTag } = user

    tags.map(t => {
        t.followsThisTag = false
    })

    followsTag.map(x => {
        tags.map(t => {
            if (x.id === t.id) {
                t.followsThisTag = true
            }
        })
    })
    return (
        <>
            {tags.map(tag => (
                <div className="post" key={tag.id}>
                    <Link href={`tags/${tag.id}`}><a><i className="text-2xl user-link" >#{tag.content}</i></a></Link>
                    <>
                        {
                            tag.followsThisTag ?
                                <button onClick={() => console.log("let's see about unfollowing")} className="sweet-button">
                                    Unfollow
                                </button> :
                                <button onClick={() => followTagHandler(tag, user)} className="sweet-button">
                                    Follow
                                </button>
                        }
                    </>
                </div>
            ))}
        </>
    )
}