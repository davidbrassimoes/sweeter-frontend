import Link from "../node_modules/next/link";

export default function Home() {
  return (
    <>
      <h1>Hello Sweeter!</h1>
      <button className="sweet-button">
        <Link href="/test-layout"><a>Test</a></Link>
      </button>
      <button className="sweet-button">
        <Link href="/feed"><a>Feed</a></Link>
      </button>
      <button className="sweet-button">
        <Link href="/chat"><a>Chat</a></Link>
      </button>
      <button className="sweet-button">
        <Link href="/settings"><a>Settings</a></Link>
      </button>
    </>
  )
}
