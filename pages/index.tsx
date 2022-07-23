import { useAuth } from '../hooks/useAuth'
import Feed from "../components/feed";
import NeedsLog from "../components/needs-log";
import Layout from '../components/layout';

export default function Home() {

  const { isLoggedIn } = useAuth()

  if (isLoggedIn) {
    return (
      <>
        <Layout>
          <Feed type="user" />
        </Layout>
      </>
    )

  } else return (
    <>
      <NeedsLog />
    </>
  )
}
