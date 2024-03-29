import { FormEvent, useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import Link from '../node_modules/next/link'
import { api } from "../services/api"
import Icon from './icon'


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
                    onClick={createPost}>
                    <a> <Icon name="post" /> </a>
                </button>
                <div className="post">
                    <p className="text-s user-link"><i>active user:</i><Link href={`../users/${user.id}`}><a>@{user.username}</a></Link></p>
                </div>
            </form>
        </>
    )
}

