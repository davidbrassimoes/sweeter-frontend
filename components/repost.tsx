import { api } from "../services/api";
import { useAuth } from '../hooks/useAuth'
import { FormEvent, useState } from "react";
import Icon from "./icon";

export default function RepostForm(value) {
    const [repostContent, setRepostContent] = useState('')
    const { user } = useAuth()

    const createRepost = async (e: FormEvent) => {
        e.preventDefault()

        if (repostContent) {
            const { data } = await api.post('/reposts', { content: repostContent, user: user.id, post: { "id": value.value } })
            setRepostContent('')
            console.log(data);
            return alert(`Sweet Published!`)

        }
        else return alert(`SWEETS MUST HAVE SWEET CONTENT!!!`)
    }
    return (
        <>
            <form className="post userPost rePost">
                <input
                    value={repostContent}
                    onChange={e => setRepostContent(e.target.value)}
                    className="text-content"
                    type="text-content"
                    id="content"
                    name="content"
                    placeholder="ReSweet This!!"
                    required />
                <button
                    onClick={createRepost}>
                    <a> <Icon name="repost" /> </a>
                </button>
            </form>
        </>
    )
}
