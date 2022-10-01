//必ずサーバサイドで実行数ため、nodeのfetchを使用する。
import fetch from "node-fetch";
const apiUrl = "https://api.notion.com/v1/databases/$DATABASE_ID/query";

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
                id: String(post.id)
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




export default async function getNotion() {

const { Client } = require('@notionhq/client');
//変更すること！！！！
const notion = new Client({ auth: 'XXXXXXXXXXXXXXXXXX' });

return (async () => {
  const databaseId = 'XXXXXXXXXXXXXXXXXXXXX';
  const response = await notion.databases.query({
    database_id: databaseId,
  });
  //console.log(response)
  ///const notionJson = await response.json();

  return response;
})();
}


function ayy(items) {
  var titles = items.map((item) => item.plain_text)
  return titles
}

function mult(items) {
  var multi_select = items.map((item) => item.name)
  return multi_select
}


function multCol(items) {
  var multi_color = items.map((item) => item.color)
  return multi_color
}
export async function getAllNotion() {
   // const { Client } = require('@notionhq/client');

    //変更すること！！！！

    const res = await getNotion();
    //await console.log(res);
    //console.log()
      const items = res.results;
      const paths = items.map((items) => ({
        params: {
          id: String(items.id),
          url: String(items.url),
          //title: String(items.properties.タイトル.title)
          //[objectと出てきたので、objectをjson文字列に変換]
          //title: JSON.stringify(items.properties.タイトル.title),
          //title: String(items.properties.タイトル.title),
          multi_select: String(mult(items.properties.技術タグ.multi_select)),
          title: String(ayy(items.properties.タイトル.title)),
          color: String(multCol(items.properties.技術タグ.multi_select)),

        },
    }
    ));
    //let json_data = await JSON.stringify(paths, ['params','url', 'id']);

    //await console.log(json_data);

    await console.log(paths);


    return { paths, fallback: false };
}


