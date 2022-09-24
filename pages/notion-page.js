import Layout from "../components/Layout";
import {getAllNotion} from "../lib/notionapi";
import Notion from "../components/Notion";

const Blog = ({ data }) => {
  return (
    <Layout title="Notion">Blog page
      <ui className="m-10">
        {/* mapで一個一個展開 */}
        {data && data.map((post) =>
          <Notion key={post.params.id} notion={post.params}/>)}

      </ui>
    </Layout>
  )
}


//成功
//{data.map((post) =>
//  <p>{post.params.id}</p>
//       )}
//

// {notions.json_data && notions.json_data.map((post) =>
//   <Notion key={post.id} notion={post.url}/>
// )}
// {notions.json_data && notions. json_data.map((post) =>
//   <p>{post.props}</p>
// )}


// {
//   notions.map((post) =>
//   //   <p>{post.props}</p>
//   <p>{post}</p>
//   )}

export default Blog

export async function getStaticProps() {
  const notions = await getAllNotion();
  //テスト
  await console.log(notions.paths)
  //mapで中身
  // const tests = await notions.paths.map((test) => ({
  // }))

  const data = notions.paths;
  //await console.log(data)
  return {
    props: {data},
  }
}



