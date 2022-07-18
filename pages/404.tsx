import SideBar from "../components/sidebar";
import Link from "../node_modules/next/link";

export default function Custom404() {
    return (
        <>
            <SideBar />
            <div className="no-post">
                <p className="text-4xl"><a>404</a> - <i>Oops!</i></p>
                <br />
                <p className="text-3xl">We Couldn't Find</p>
                <p className="text-3xl">What You Were Looking For...</p>
                <br />
                <p className="text-3xl">How About</p>
                <p className="text-4xl"> <i> Checking the Latest</i>
                    <Link href="feed"><a className="user-link"> SWEETS </a></Link>?
                </p>
            </div>
        </>
    );
}