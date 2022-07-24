import { api } from "./api"

export async function followTag(tag) {
    const { data } = await api.put(`follow/tag/${tag.id}`)

    return data
}

export async function followUser(user) {
    const { data } = await api.put(`follow/user/${user.id}`)

    return data
}

export async function removeFollowTag(tag) {
    const { data } = await api.delete(`follow/user/${tag.id}`)

    return data

}
export async function removeFollowUser(user) {
    const { data } = await api.delete(`follow/user/${user.id}`)

    return data
}