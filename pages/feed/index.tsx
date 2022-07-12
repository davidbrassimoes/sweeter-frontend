import UserPost from "../../components/userpost";
import Post from "../../components/post";


export default function Feed({ data }) {


    const feed = data.sort((a, b) => {
        const fa = a.createdAt.toLowerCase()
        const fb = b.createdAt.toLowerCase();

        if (fa < fb) {
            return 1;
        }
        if (fa > fb) {
            return -1;
        }
        return 0;
    });

    return (
        <>
            <UserPost></UserPost>
            <Post data={data}></Post>

        </>
    )
}

export async function getServerSideProps() {
    const postRes = await fetch(`http://localhost:3001/posts`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json;charset=UTF-8',
        },
    })
    const data = await postRes.json()
    // const postData = await postRes.json()
    //mudar isto para reposts depois de definir o componente essas coisinhas
    // const repostRes = await fetch(`http://localhost:3001/posts`, {
    //     method: 'GET',
    //     headers: {
    //         'content-type': 'application/json;charset=UTF-8',
    //     },
    // })
    // const repostData = await repostRes.json()
    // const data = [...postData, ...repostData]
    return { props: { data } }
}

