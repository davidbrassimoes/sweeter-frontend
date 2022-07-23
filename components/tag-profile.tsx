import { useAuth } from "../hooks/useAuth"
import { followTagHandler } from "../services/follow"

export default function TagProfile({ data }) {
    const { user } = useAuth()

    return (
        <>
            <div className="post">
                <h1 className='text-4xl'>#{data.content}</h1>
                <i>{data.followers} {data.followers === 1 ? "follower" : "followers"}</i>

                <>
                    {
                        data.followsThisTag ?
                            <button onClick={() => console.log("let's see about unfollowing")} className="sweet-button">
                                Unfollow
                            </button> :
                            <button onClick={() => followTagHandler(data, user)} className="sweet-button">
                                Follow
                            </button>
                    }
                </>
            </div>
        </>
    )
}