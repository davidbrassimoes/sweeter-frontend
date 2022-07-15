import { api } from "./api"

export async function likeHandler(post, user) {
    const { data } = await api.get(`users/${user.id}`)
    const myUserLikes = data[0].likes
    const myUserLikesId = myUserLikes.map(x => x.id)

    if (myUserLikesId.includes(post.id)) { return alert("Already Liked!") }

    const res = await api.put(`users/${user.id}`, { likes: [...myUserLikes, { "id": post.id }] })
    console.log(res)
    return alert("Post Liked!")
}
export async function likeRepostHandler(post, user) {
    const { data } = await api.get(`users/${user.id}`)
    const myUserLikes = data[0].likesRepost
    const myUserLikesId = myUserLikes.map(x => x.id)

    if (myUserLikesId.includes(post.id)) { return alert("Already Liked!") }

    const res = await api.put(`users/${user.id}`, { likesRepost: [...myUserLikes, { "id": post.id }] })
    console.log(res)
    return alert("Post Liked!")
}