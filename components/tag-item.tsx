import Link from "../node_modules/next/link";
import { followTagHandler } from "../services/follow";

export default function TagItem({ data }) {
    const { myUser, tags } = data

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
                                <button onClick={() => followTagHandler(tag, myUser)} className="sweet-button">
                                    Follow
                                </button>
                        }
                    </>
                </div>
            ))}
        </>
    )
}