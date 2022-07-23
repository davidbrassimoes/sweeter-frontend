import SideBar from "../components/sidebar";
import UserPost from "../components/userpost";

export default function Layout({ children }) {
    return (
        <>
            <SideBar />
            <UserPost />
            {children}
        </>
    )
}