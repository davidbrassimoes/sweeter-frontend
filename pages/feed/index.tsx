import Link from "../../node_modules/next/link";

export default function Feed() {
    return (
        <>
            <h1 className="text-5xl">Hello Feed!</h1>
            <button className="sweet-button">
                <Link href="/"><a>Sweet</a></Link>
            </button>
        </>
    )
}
