import LogIn from "../components/login";
import SideBar from "../components/sidebar";
import SignUp from "../components/sign-up";
import UserPost from "../components/userpost";
import { useAuth } from '../hooks/useAuth'
import Feed from "../components/home-feed";


function NeedsLog() {
  return (
    <>
      <LogIn />
      <SignUp />
    </>
  )
}

export default function Home() {

  const { isLoggedIn, user } = useAuth()

  if (isLoggedIn) {
    return (
      <>
        <SideBar />
        <UserPost />
        <Feed />
      </>
    )

  } else return (
    <>
      <div className="no-post">
        <h1 className="text-3xl">Welcome To <a> SWEETER!</a></h1>
        <h1 className="text-xl">Please <a className="text-2xl"> Log In</a> or  <a className="text-2xl"> Sign Up </a>to check something <a className="text-2xl"> SWEET!!!</a></h1>
      </div>
      <NeedsLog />
    </>
  )
}
