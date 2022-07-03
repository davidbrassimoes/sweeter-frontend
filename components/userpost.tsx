import Link from "../node_modules/next/link";

export default function UserPost() {

    return (
        <>
            <div className="post userPost">
                <div className="text-content">
                    <textarea placeholder="Tell us something Sweet..." wrap="hard" maxlength="255" rows="5"
                        cols="50"></textarea>
                    <button className="sweet-button">
                        <Link href="/"><a>Sweet</a></Link>
                    </button>
                </div>
            </div>
        </>
    )
} 