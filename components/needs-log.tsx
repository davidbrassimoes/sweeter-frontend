import LogIn from "./login";
import SignUp from "./sign-up";
import Welcome from "../components/welcome";

export default function NeedsLog() {
    return (
        <>
            <Welcome />
            <LogIn />
            <SignUp />
        </>
    )
}