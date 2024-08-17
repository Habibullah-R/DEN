import React, { useEffect, useState } from 'react'
import PostCard from "../componenets/PostCard.jsx"
import Container from "../componenets/Container.jsx";
import Button from "../componenets/Button.jsx";
import Loader from "../componenets/Loader.jsx"
import { Link } from 'react-router-dom'
import { getToken } from '../utills/localStorage'
import { IoAdd } from "react-icons/io5";

const MyPosts = () => {
  const [posts ,setPosts] = useState([])
  const token = getToken();
  const [ loading , setLoading] = useState(false);

  async function getAllPosts(){
    try {
      setLoading(true);
      const response = await fetch("/api/v1/post/getCurrentUserPosts",
        {
          method:"GET",
          headers:{
            Authorization: `Bearer ${token}`
          }
        }
      )
      const data = await response.json();
      if(data.success === false){
        setLoading(false);
        return;
      }
      const myPosts = data.data.posts;
      setPosts([...myPosts]);
      setLoading(false);
    } catch (error) {
      console.log(error)
      setLoading(false);
    }
  } 

  useEffect(()=>{
    getAllPosts()
  },[])
  return (
    <>
    <Container className='py-4'>
      <Link to="createPost">
      <Button className='w-full my-4 flex items-center justify-center'> <IoAdd className='text-white mr-1' size={20} />Create new Post</Button>
      </Link>
      <div className='flex max-lg:justify-between flex-wrap gap-5'>
      {
        posts && posts.length >0 && posts.map((post , index)=>(
          <PostCard refresh={getAllPosts} key={index} post={post}/>
        ))
      }
      </div>
      {loading && (
        <div className="fixed inset-0 top-[70px]">
        <Loader />
      </div>
      )}
    </Container>
    </>
  )
}

export default MyPosts