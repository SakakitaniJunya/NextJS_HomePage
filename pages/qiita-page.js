import Layout from "../components/Layout";
import Image from "next/image";
import axios from 'axios';
import { useState, useEffect } from 'react';

const QIITA_API_URL = 'https://qiita.com/api/v2/authenticated_user/items';

async function getUserPosts(token) {
  const response = await axios.get(QIITA_API_URL, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return response.data;
}

const Contact = () => {
    const [posts, setPosts] = useState([]);
    const [tags, setTags] = useState({});
    const [isFiltered, setIsFiltered] = useState(false);
  
    useEffect(() => {
        const token = "bb7ae7059f42f7c2b07346a04056e5f9982766cb";
        getUserPosts(token).then(data => {
        setPosts(data);
  
        let allTags = {};
        data.forEach(post => {
          post.tags.forEach(tag => {
            allTags[tag.name] = false;
          });
        });
        setTags(allTags);
      });
    }, []);
  
    const selectAllTags = () => {
      const updatedTags = Object.keys(tags).reduce((acc, curr) => {
        acc[curr] = true;
        return acc;
      }, {});
      setTags(updatedTags);
      setIsFiltered(true);
    };
  
    const deselectAllTags = () => {
      const updatedTags = Object.keys(tags).reduce((acc, curr) => {
        acc[curr] = false;
        return acc;
      }, {});
      setTags(updatedTags);
      setIsFiltered(false);
    };
  
    const handleCheckboxChange = (tag) => {
      setTags(prevState => ({ ...prevState, [tag]: !prevState[tag] }));
      setIsFiltered(true);
    };
  
    const filteredPosts = isFiltered ? posts.filter(post => {
      for (let tag of post.tags) {
        if (tags[tag.name]) return true;
      }
      return false;
    }) : posts;

  return (
    <Layout title="Qiita">
    <div className="flex justify-between">
      <div className="flex-3 flex flex-wrap gap-4">
        {filteredPosts.map((post) => (
          <div key={post.id} className="card border p-4 m-2 bg-gray-100 rounded-lg shadow-md transition-shadow hover:shadow-lg w-72 h-40 flex flex-col justify-between">
            <a href={post.url} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline mb-2"><h2 className="font-bold">{post.title}</h2></a>
            <div className="flex flex-col justify-between h-full">
              <div className="flex flex-wrap gap-1 mb-2">
                {post.tags.map(tag => (
                  <span key={tag.name} className="tag bg-green-600 text-white rounded px-2 py-1 text-xs">{tag.name}</span>
                ))}
              </div>
              <div className="flex justify-between items-end">
                <div className="flex items-center gap-2">
                  {/* いいねのアイコン */}
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="mr-1">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
                    </svg>
                    <span>{post.likes_count}</span>
                  </div>
                  {/* ページビューのアイコン */}
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="mr-1">
                        <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17a5 5 0 1 1 0-10 5 5 0 0 1 0 10z"></path>
                    </svg>
                    <span>{post.page_views_count}</span>
                  </div>
                </div>
                <div className="flex items-center">
                  {/* ストックのアイコン */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="mr-1">
                      <path d="M17 3H7a2 2 0 0 0-2 2v18l7-3 7 3V5a2 2 0 0 0-2-2z"></path>
                  </svg>
                  <span>{post.stocks_count}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
  
      {/* 既存のサイドバー部分のコード（変更なし） */}
      <aside className="flex-1 p-4 border-l bg-gray-200">
        <h3 className="font-semibold mb-4">技術タグ</h3>
        <button onClick={selectAllTags} className="mr-2 mb-2 px-4 py-1 bg-green-600 text-white rounded">Select All</button>
        <button onClick={deselectAllTags} className="mb-4 px-4 py-1 bg-red-600 text-white rounded">Deselect All</button>
        {Object.keys(tags).map(tag => (
          <div key={tag} className="flex items-center mb-2">
            <input type="checkbox" id={tag} checked={tags[tag]} onChange={() => handleCheckboxChange(tag)} className="mr-2 cursor-pointer bg-green-600" />
            <label htmlFor={tag} className="cursor-pointer">{tag}</label>
          </div>
        ))}
      </aside>
    </div>
  </Layout>
  
  );
}

export default Contact;
