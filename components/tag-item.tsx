import Link from "../node_modules/next/link";
import { followTag, removeFollowTag } from "../services/follow";

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
                                <button onClick={() => removeFollowTag(tag)} className="sweet-button">
                                    Unfollow
                                </button> :
                                <button onClick={() => followTag(tag)} className="sweet-button">
                                    Follow
                                </button>
                        }
                    </>
                </div>
            ))}
        </>
    )
}