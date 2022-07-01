import Link from "../../node_modules/next/link";

export default function Settings() {
    return (
        <>
            <h1 className="text-5xl">Hello Settings!</h1>
            <button className="sweet-button">
                <Link href="/"><a>Sweet</a></Link>
            </button>
        </>
    )
}
