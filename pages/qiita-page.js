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
      const token = process.env.NOTION_DATABASE_ID;;
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
              <a href={post.url} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline"><h2 className="font-bold">{post.title}</h2></a>
              <div className="flex flex-wrap gap-1">
                {post.tags.map(tag => (
                  <span key={tag.name} className="tag bg-green-600 text-white rounded px-2 py-1 text-xs">{tag.name}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

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
