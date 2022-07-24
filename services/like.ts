import { api } from "./api"

export async function like(post) {
    const { data } = await api.put(`like/post/${post.id}`)

    return data
}
export async function likeRepost(post) {
    const { data } = await api.put(`like/repost/${post.id}`)

    return data
}
export async function removeLike(post) {
    const { data } = await api.delete(`like/post/${post.id}`)

    return data
}
export async function removeLikeRepost(post) {
    const { data } = await api.delete(`like/repost/${post.id}`)

    return data
}