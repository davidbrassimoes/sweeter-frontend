import { api } from "./api"

export async function followTagHandler(tag, user) {
    const { data } = await api.get(`users/${user.id}`)
    const myUserFollows = data[0].followsTag
    const myUserFollowsId = myUserFollows.map(x => x.id)

    if (myUserFollowsId.includes(tag.id)) { return alert(`You Already Follow #${tag.content}!`) }

    const res = await api.put(`users/${user.id}`, { followsTag: [...myUserFollows, { "id": tag.id }] })
    console.log(res)
    return alert(`Tag #${tag.content} Followed!`)
}

export async function followUserHandler(user, myId) {
    const { data } = await api.get(`users/${myId}`)
    const myUserFollows = data[0].followsUser
    const myUserFollowsId = myUserFollows.map(x => x.id)

    if (myUserFollowsId.includes(user.id)) { return alert(`You Already Follow @${user.username}!`) }


    const res = await api.put(`users/${myId}`, { followsUser: [...myUserFollows, { "id": user.id }] })
    console.log(res)
    return alert(`User @${user.username} Followed!`)
}

export async function unFollowTag(tag, user) {
    const { data } = await api.get(`users/${user.id}`)
    const myUserFollows = data[0].followsUser
    const newUserFollows = new Array
    const res = await api.put(`users/${user.id}`, { followsUser: newUserFollows })

}
export async function unFollowUser(user, myUser) {

}