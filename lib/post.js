//必ずサーバサイドで実行数ため、nodeのfetchを使用する。
import fetch from "node-fetch";
const apiUrl = "https://jsonplaceholder.typicode.com/posts";

export async function getAllPostsData() {
    const res = await fetch(new URL(apiUrl));
    const posts = await res.json();
    return posts;
}

//PostsのID一覧を取得
export async function getAllPostIds() {
    const res = await fetch(new URL(apiUrl));
    const posts = await res.json();

    return posts.map((post) =>{
        return {
            params: {
                id: String(post.id),
                url: String(post.url)
            },
        };
    });

}


export async function getPostData(id) {
    const res = await fetch(new URL(`${apiUrl}/${id}`));
    const post = await res.json();

    return {
        post,
    };
}
