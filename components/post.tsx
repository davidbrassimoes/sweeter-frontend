import { DateTime } from "luxon";
import Link from "../node_modules/next/link";
import { likeHandler, likeRepostHandler } from '../services/like'
import Icon from "./icon";

export default function Post({ data }) {

    const { feed, myUser } = data

    return (
        <>
            {feed.map(post => (
                <div key={post.isRepost ? `${post.id}_r` : post.id}>
                    <Link href={post.isRepost ? `../feed/repost/${post.id}` : `../feed/${post.id}`} ><a>
                        <div className="post" >
                            <div>
                                <Link href={`../users/${post.user.id}`}>
                                    <a><div className="avatar" style={{ backgroundColor: `${post.user.avatarColor}` }}>{post.user.username.substr(0, 1).toUpperCase()}</div></a>
                                </Link>
                                <Link href={`../users/${post.user.id}`}>
                                    <a><h2 className="user-link"> @{post.user.username}</h2></a>
                                </Link>
                                <h3><i>{DateTime.fromISO(`${post.createdAt}`).toFormat('dd-MM-yyyy HH:mm')}</i></h3>
                                <>
                                    {
                                        post.isRepost ?
                                            <>

                                                <button onClick={() => likeRepostHandler(post, myUser)}>
                                                    <a> <Icon name={post.myUserLikes ? "liked" : "like"} /> {post.likes}</a>
                                                </button>

                                            </>
                                            :
                                            <>
                                                <button onClick={() => likeHandler(post, myUser)}>
                                                    <a> <Icon name={post.myUserLikes ? "liked" : "like"} /> {post.likes}</a>
                                                </button>
                                            </>
                                    }
                                </>
                            </div>

                            <> {post.isRepost ?
                                <>
                                    <div key={post.post.id}>
                                        <p>{post.content}</p>
                                        <Link href={`../feed/${post.post.id}`} ><a className="to-repost"><p>{post.post.content}</p></a></Link>
                                    </div>
                                </>
                                :
                                <>
                                    <div>
                                        <p>{post.content}</p>
                                    </div>
                                </>
                            } </>
                        </div>
                    </a></Link>
                </div>
            ))}
        </>
    )

}

