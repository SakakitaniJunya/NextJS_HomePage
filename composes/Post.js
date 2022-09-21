
const Post = ({ post }) => {
    return(
        <div className="">
            <span>{post.id}</span>
            {" : "}
            <span className="cursor-pointer text-blue-500 boder-b border-blue-500 hover:bg-gray-200">
                {post.title}
            </span>
        </div>
    )
}

export default Post;
