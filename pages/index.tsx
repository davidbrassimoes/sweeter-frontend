import LogIn from "../components/login";
import SideBar from "../components/sidebar";
import SignUp from "../components/sign-up";


export default function Home() {

  return (
    <>
      <h1>Hello Sweeter</h1>
      <SideBar />
      <LogIn />
      <SignUp />
    </>
  )
}
