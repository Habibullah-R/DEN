import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Input, Button, Loader } from "../componenets";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useRef } from "react";
import { getToken } from "../utills/localStorage";
import { toast } from "react-toastify";

function UpdatePost() {
  const [post, setPost] = useState({});
  const [title, setTitle] = useState(post.title);
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");
  const { postSlug } = useParams();
  const imageRef = useRef();
  const token = getToken();
  const [error , setError] = useState("");
  const [loading , setLoading] = useState(false);
  const [ updateImage , setUpdateImage] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function getPost(slug) {
      try {
        const response = await fetch(`/api/v1/post/getPost/${slug}`, {
          method: "GET",
        });
        const data = await response.json();
        if (data.success === false) {
          console.log(error)
          return;
        }
        setTitle(data.data.posts.title);
        setContent(data.data.posts.content);
        setPost(data.data.posts);
      } catch (error) {
        console.log(error);
      }
    }
    getPost(postSlug);
  }, []);

  const handleImageChange = async (e) => {
    setImage(e.target.files[0]);
    setUpdateImage(true);
  };

  const handleImageClick = () => {
    imageRef.current.click();
  };

  const imageChange = async (postid , userId) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("image", image);
      const response = await fetch(
        `/api/v1/post/updateImage/${postid}/${userId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );
      const data = await response.json();
      if(data.success === false){
        setLoading(false);
        setError(data.message);
        return;
      }
      setUpdateImage(false);
      setLoading(false);
      toast(data.message);
    } catch (error) {
      setLoading(false)
      setError(error.message);
    }
  };

  const handleFormUpdate = async (e,postid,userId)=>{
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch(
        `/api/v1/post/updateContent/${postid}/${userId}`,
        {
          method: "POST",
          headers: {
            "content-type":"application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title,
            content
          }),
        }
      );
      const data = await response.json();
      if(data.success === false){
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      Navigate(`/post/${data.data.post.slug}`)
      toast(data.message);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  }

  return (
    <>
      <Container>
        <div className="my-8 max-w-lg mx-auto">
          <h2 className="text-2xl text-center mb-4">Create A Post</h2>
          <div className="w-full mb-7" onClick={handleImageClick}>
            {image ? (
              <img
                className="w-full h-72 z-10 cursor-pointer"
                src={URL.createObjectURL(image)}
                alt=""
              />
            ) : (
              <img
                className="w-full h-72 z-10 cursor-pointer"
                src={post.image}
                alt=""
              />
            )}
            <input
              type="file"
              ref={imageRef}
              onChange={handleImageChange}
              className="hidden"
            />
          </div>
          {image && updateImage && (
              <Button
                disabled={loading}
                className="w-40 my-5"
                onClick={() => imageChange(post._id, post.userId)}
              >
                {loading ? <Loader/> : " Update"}
              </Button>
            )}
          <form onSubmit={(e)=>handleFormUpdate(e,post._id,post.userId)} className="flex flex-col gap-4">
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              label="Title *"
              placeholder="Write title of your blog"
            />
            <ReactQuill
              theme="snow"
              className="h-60 mt-4 mb-12"
              value={content}
              onChange={setContent}
            />
            <Button disabled={loading} className="mb-10">
              { 
                loading ? <Loader/>  : "Update"
              }
            </Button>
          </form>
        </div>
      </Container>
    </>
  );
}

export default UpdatePost;
