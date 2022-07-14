import LogIn from "../components/login";
import SideBar from "../components/sidebar";
import SignUp from "../components/sign-up";
import UserPost from "../components/userpost";
import { useAuth } from '../hooks/useAuth'


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
      </>
    )

  } else return (
    <>
      <h1 className="text-2xl">Welcome To Sweeter!</h1>
      <h1 className="text-xl">Please Log In or Sign Up to check something Sweet!!!</h1>
      <NeedsLog />
    </>
  )
}
