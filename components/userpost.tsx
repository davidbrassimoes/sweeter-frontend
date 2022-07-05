import Link from "../node_modules/next/link";
import { useState } from 'react'

export default function UserPost() {

    const [postContent, setPostContent] = useState('')

    const createPost = async (e) => {

        e.preventDefault()

        if (postContent) {
            const res = await fetch('http://localhost:3001/posts', {
                method: 'POST',
                body: JSON.stringify({ content: postContent, user: 1 }),
                headers: {
                    'content-type': 'application/json;charset=UTF-8',
                }
            })
            const data = await res.json()
            console.log(data);

            return alert(`Sweet Published!`)
        }

        else return alert(`SWEETS MUST HAVE SWEET CONTENT!!!`)

    }

    return (
        <>
            <form className="post userPost">
                <input
                    value={postContent}
                    onChange={e => setPostContent(e.target.value)}
                    className="text-content"
                    type="text-content"
                    id="content"
                    name="content"
                    placeholder="Tell us something Sweet..."
                    required />
                <button
                    className="sweet-button"
                    onClick={createPost}>
                    <a>Sweet</a>
                </button>
            </form>
        </>
    )
}

