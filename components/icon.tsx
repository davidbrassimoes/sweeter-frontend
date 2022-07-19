import Image from 'next/image'

export default function Icon({ name }) {
    if (name == "like") {
        return <Image className="like" src={`/${name}.svg`} height={23} width={23} />
    }
    if (
        name == "post" ||
        name == "repost" ||
        name == "update" ||
        name == "user_add" ||
        name == "user_remove"
    ) {
        return <Image className="icon" src={`/${name}.svg`} height={40} width={40} />
    }
    return <Image className="icon" src={`/${name}.svg`} height={50} width={50} />
}