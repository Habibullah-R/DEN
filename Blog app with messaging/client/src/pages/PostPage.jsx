import React , { useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import Container from "../componenets/Container.jsx";
import Loader from '../componenets/Loader.jsx';

function PostPage() {
  const { postSlug } = useParams();
  const [post , setPost] = useState({});
  const [error,setError] = useState("")
  const [loading , setLoading] = useState(false);

  useEffect(() => {
    async function getPost(slug) {
      try {
        setLoading(true);
        const response = await fetch(`/api/v1/post/getPost/${slug}`,{ method: "GET"});
        const data = await response.json();
        if(data.success === false){
          setError(data.message)
          setLoading(false);
          return;
        }
        setPost(data.data.posts);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(error.message);
      }
    }
    getPost(postSlug)
  }, [postSlug])
  

  return (
    <>
    {loading && (
      <div className="fixed inset-0 top-[70px] bg-black bg-opacity-50 z-40">
      <Loader />
    </div>
    ) }
    { error ? (
      <h3 className='text-center text-lg text-red-500'>{error}</h3>
    ) 
    :(
      <Container className='py-5'>
    <div className='max-w-2xl my-16 mx-auto'>
    <h2 className='mb-5 text-center text-4xl font-semibold'>{post.title}</h2>
      <img src={post.image} className='h-72 w-full my-10 border-0 border-none' alt="" />
      <hr />
      <div className='mb-10 mt-5 showPost'
      dangerouslySetInnerHTML={{ __html: post && post.content }}>
      </div>
    </div>
    </Container>
    )  
  }
    </>
  )
}

export default PostPage