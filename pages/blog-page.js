import Layout from "../components/Layout";
import {getAllPostsData} from "../lib/post";
import Post from "../components/Post";

const Blog = ({ posts }) => {
  return (
    <Layout title="Blog">Blog page
      <ui className="m-10">
        {/* mapで一個一個展開 */}
        {posts && posts.map((post) => <Post key={post.id} post={post}/>)}
      </ui>
    </Layout>
  )
}

export default Blog

export async function getStaticProps() {
  const posts = await getAllPostsData();
  return {
    props: {posts},
  }
}
