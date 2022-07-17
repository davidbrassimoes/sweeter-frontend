import { api } from "./api";

export async function saveBio(user, bio) {
    const { data } = await api.put(`users/${user.id}`, { bio: bio })

    console.log(data);
    return alert("New Bio Saved!")
}