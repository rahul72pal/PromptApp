'use client';

import React from 'react'
import { useState, useEffect } from 'react';
import PromptCard from './PromptCard'

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

const Feed = () => {
  // const [allPosts, setAllPosts] = useState([]);

  //search state
  const [searchText, setSearchText] = useState('');
  const [searchTimeout, setSearchTimeOut] = useState(null);
  const [searchedResults, setSearchedResult] = useState([]);

  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const resposne = await fetch('/api/prompt');
    const data = await resposne.json();
    console.log("Posts data is here =", data);
    setPosts(data);
  }

  useEffect(() => {
    
    fetchPosts();
  }, []);

  const filterPrompts = (searchText) => {
    const regex = new RegExp(searchText, "i");
    return posts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

  const handleSearcgChange = (e) => {
    clearTimeout(searchTimeout);
    console.log("Value =",e.target.value)
    setSearchText(e.target.value);

    //debounce methode
    setSearchTimeOut(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedResult(searchResult);
      }, 500)
    );
  };

  const handleTagClick = (tagName) => {
    console.log("Tagname =",tagName)
    setSearchText(tagName);

    const searchResult = filterPrompts(tagName);
    setSearchedResult(searchResult);
  }

  return (
    <section>
      <form className='relative w-full mt-5 flex-center'>
        <input
          type="text"
          placeholder='Search for a tag or a username'
          value={searchText}
          onChange={handleSearcgChange}
          required
          className='search_input peer'
        />
      </form>

      {/* {All prompt } */}
      {searchText ? (
        <PromptCardList
          data={searchedResults}
          handleTagClick={handleTagClick}
        />
      ) : (
        <PromptCardList data={posts} handleTagClick={handleTagClick}/>
      )}

    </section>
  )
}

export default Feed
