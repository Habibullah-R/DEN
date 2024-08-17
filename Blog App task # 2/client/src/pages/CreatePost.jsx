import React, { useState } from 'react'
import Input from "../componenets/Input.jsx"
import Container from "../componenets/Container.jsx";
import Button from "../componenets/Button.jsx";
import Loader from "../componenets/Loader.jsx"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getToken } from '../utills/localStorage';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';

function CreatePost() {
    const [title , setTitle] = useState("");
    const [image , setImage] = useState("");
    const [ content , setContent] = useState("");
    const token = getToken();
    const [loading , setLoading] = useState(false)
    const navigate = useNavigate();
    const [ error , setError] = useState("")

    const handleFormSubmit = async (e)=>{
        e.preventDefault();
        setLoading(true)
        try {
          toast("This will take few seconds.")
          const formData = new FormData();

          formData.append("title",title);
          formData.append("image",image);
          formData.append("content",content);

          console.log([...formData.entries()]);

          const response = await fetch("/api/v1/post/createPost",{
            method:"POST",
            headers:{
              Authorization:`Bearer ${token}`
            },
            body: formData
          })

          const data = await response.json();
          if(data.success === false){
            setLoading(false)
            setError(data.message)
            return;
          }
            toast(data.message);
            navigate(`/post/${data.data.post.slug}`)
        } catch (error) {
          setLoading(false)
          setError(data.message)
        }
    }

  return (
    <Container>
        <div className='my-8 max-w-lg mx-auto'>
            <h2 className='text-2xl text-center mb-4'>Create A Post</h2>
            <form onSubmit={handleFormSubmit} className='flex flex-col gap-4'>
            <Input value={title} onChange={(e)=>setTitle(e.target.value)} label="Title *" placeholder="Write title of your blog"/>
            <Input onChange={(e)=>setImage(e.target.files[0])} type="file" className='border-dashed cursor-pointer' label="Select image *"/>
            <ReactQuill theme="snow" className='h-60 mt-4 mb-12'  value={content} onChange={setContent}/>
            {error && <p className='text-sm text-red-500'>{error}</p>}
            <Button className='mb-10 px-auto' disabled={loading}>
              {loading ? <Loader/> : "Create"}
            </Button>
            </form>
        </div>
    </Container>
  )
}

export default CreatePost