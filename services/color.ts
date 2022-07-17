import { FormEvent, useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { api } from "../services/api"


export function getColor(e: FormEvent) {
    e.preventDefault()
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    const color = "#" + randomColor

    console.log(color)
    return color

}

export async function saveColor(user, selectedColor) {

    if (selectedColor) {

        const { data } = await api.put(`/users/${user.id}`, { avatarColor: selectedColor })
        console.log(data);
        return alert("New Avatar Color Set!")
    }



}