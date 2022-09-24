import Link from 'next/link';

//UIコンポーネントの定義　
    //カードでもOK
const Notion = ({ notion }) => {
    //console.log(notion)
    return(
        <div className="">
            <span>{notion.id}</span>
            {" : "}

                    <span className="cursor-pointer text-blue-500 boder-b border-blue-500 hover:bg-gray-200">
                        {notion.title.plain_text}
                    </span>

        </div>
    )
}

export default Notion;


// <link href={`/posts/${post.id}`}>
