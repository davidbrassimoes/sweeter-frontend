import { useAuth } from "../hooks/useAuth"
import { followTag, removeFollowTag } from "../services/follow"

export default function TagProfile({ data }) {

    return (
        <>
            <div className="post">
                <h1 className='text-4xl'>#{data.content}</h1>
                <i>{data.followers} {data.followers === 1 ? "follower" : "followers"}</i>

                <>
                    {
                        data.followsThisTag ?
                            <button onClick={() => removeFollowTag(data)} className="sweet-button">
                                Unfollow
                            </button> :
                            <button onClick={() => followTag(data)} className="sweet-button">
                                Follow
                            </button>
                    }
                </>
            </div>
        </>
    )
}