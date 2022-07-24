import { useState } from "react"
import { getColor, saveColor } from "../services/color"
import { saveBio } from "../services/user-update"
import Icon from "./icon"

export default function EditUser({ data }) {
    const [color, setColor] = useState('')
    const [editVisible, setEditVisible] = useState(false)
    const [bio, setBio] = useState('')

    return (
        <>
            <div className="post">
                <h1 className="text-xl">Bio: <i>{data.bio}</i></h1>
                <button onClick={() => setEditVisible(!editVisible)}> <Icon name={editVisible ? "toggle_on" : "toggle_off"} /> </button>
            </div>
            {editVisible ?
                <>
                    <div className="post">
                        <form className="post userPost">
                            <input onChange={e => setBio(e.target.value)} value={bio} className="text-content" type="text" placeholder={`${data.bio}`} />
                        </form>
                        <button onClick={() => saveBio(data, bio)}><Icon name="save" /></button>
                    </div>
                    <div className="post">
                        <h1>Avatar Color:</h1>
                        <button onClick={() => alert(`HEX Color Code: ${data.avatarColor}`)} className="sweet-button" style={{ backgroundColor: data.avatarColor }}>Current</button>
                        <button onClick={(e) => setColor(getColor(e))} className="sweet-button" style={{ backgroundColor: color }}>New</button>
                        <button onClick={() => saveColor(data, color)}><Icon name="save" /></button>
                    </div>
                </>
                :
                null
            }

        </>
    )
}