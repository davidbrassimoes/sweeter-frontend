import { FormEvent, useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { api } from "../services/api"


export default function UserPost() {

    const [postContent, setPostContent] = useState('')

    const { user } = useAuth()

    const createPost = async (e: FormEvent) => {

        e.preventDefault()

        if (postContent) {
            const { data } = await api.post('/posts', { content: postContent, user: user.id })

            console.log(data);
            setPostContent('')
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

