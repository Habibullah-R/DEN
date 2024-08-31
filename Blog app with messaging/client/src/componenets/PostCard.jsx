import React, { useState , useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "./Button"
import { getToken } from "../utills/localStorage";
import { toast } from "react-toastify";
import ConfirmationModal from "./ConfirmationModal";

function PostCard({ post, refresh }) {
  const token = getToken();
  const [showModal, setShowModal] = useState(false);

  const handleDelete = async (e,postid, userid) => {
    e.stopPropagation();
    try {
      const response = await fetch(
        `/api/v1/post/deletePost/${postid}/${userid}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      if (data.success === false) {
        toast(data.message);
        return;
      }
      setShowModal(false)
      toast(data.message);
      refresh();
    } catch (error) {
      toast(data.message);
    }
  };

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

  }, [showModal]);

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40">
          <ConfirmationModal
          text="Are you sure you want to delete the post?"
          btn1="Delete"
          btn2="Cancel"
          hide={() => setShowModal(false)}
          successMethod={(e) => handleDelete(e,post._id, post.userId)}
        />
        </div>
      )}
      <div className="cursor-pinter max-xl:w-[48%] relative h-[500px] max-md:w-full xl:w-[32%] mt-5 w-[350px] border border-gray-700 bg-[#1F2937] rounded-md">
        <img className="object-fit w-full h-[220px] rounded-md" src={post.image} alt="" />
        <p className='px-2 text-sm mt-4'>Created At : {post.createdAt.slice(0,10)}</p>
        <hr />
        <div className="p-2">
          <h2 className="text-2xl font-semibold">{post.title.slice(0,70)}</h2>

         <div className="absolute w-[95%] bottom-4 left-[2.5%]">
         <Link to={`/post/${post.slug}`}>
            <Button className="w-full my-2">Read</Button>
          </Link>

          <div className="flex gap-3">
            <Link className="w-full" to={`/updatePost/${post.slug}`}>
              <Button className="w-full">Update</Button>
            </Link>
            <Button className="w-full" onClick={() => setShowModal(true)}>
              Delete
            </Button>
          </div>
         </div>
        </div>
      </div>

    </>
  );
}

export default PostCard;
