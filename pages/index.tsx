import LogIn from "../components/login";
import SideBar from "../components/sidebar";
import SignUp from "../components/sign-up";
import { useAuth } from '../hooks/useAuth'


function NeedsLog() {
  return (
    <>
      <LogIn></LogIn>
      <SignUp></SignUp>
    </>
  )
}

export default function Home() {

  const { isLoggedIn, user } = useAuth()

  if (isLoggedIn) {
    return (
      <>
        <SideBar />
        <h1>Hello {user.username} </h1>
      </>
    )

  } else return (
    <>
      <h1>Hello Sweeter</h1>
      <h1>Please Log In or Sign Up to check something Sweet!!!</h1>
      <NeedsLog />
    </>
  )
}
