import { useAuth } from "../hooks/useAuth"
import { followUserHandler } from "../services/follow"
import Icon from "./icon"

export default function UserProfile({ data }) {

    const { user } = useAuth()

    return (
        <>
            <div className="post">
                <div className="avatar" style={{ backgroundColor: `${data.avatarColor}` }}>{data.username.substr(0, 1).toUpperCase()}</div>
                <h1 className='text-4xl'>@{data.username}</h1>
                <i>{data.followers} {data.followers === 1 ? "follower" : "followers"}</i>
            </div>
            <div className="post">
                <i className='text-2xl pl-5'>{data.bio}</i>
                <>
                    {
                        data.followsThisUser ?
                            <button onClick={() => console.log("let's see about unfollowing")} >
                                <Icon name="user_remove" />
                            </button> :
                            <button onClick={() => followUserHandler(data, user)} >
                                <Icon name="user_add" />
                            </button>
                    }
                </>
            </div>
        </>
    )
}