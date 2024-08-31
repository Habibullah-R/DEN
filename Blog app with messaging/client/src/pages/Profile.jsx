import React, { useState, useRef , useEffect } from "react";
import Input from "../componenets/Input.jsx"
import Container from "../componenets/Container.jsx";
import Button from "../componenets/Button.jsx";
import { useDispatch, useSelector } from "react-redux";
import PasswordUpdateModal from "../componenets/PasswordUpdateModal.jsx"
import { useNavigate } from "react-router";
import ConfirmationModal from "../componenets/ConfirmationModal.jsx";
import { avatarChange , credentialsUpdate } from "../redux-toolkit/reducers/userReducer/userApiCalls.js";

function Profile() {
  const { userData } = useSelector((state) => state.user);
  const [username, setUsername] = useState(userData.data.user.username);
  const [email, setEmail] = useState(userData.data.user.email);
  const [avatar, setAvatar] = useState(null);
  const imageRef = useRef();
  const dispatch = useDispatch();
  const { error , loading } = useSelector((state)=>state.user)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const handleImageClick = async () => {
    imageRef.current.click();
  };

  const handleImageChange = async (e) => {
    setAvatar(e.target.files[0]);
  };

  const handleAvatarChange = async () => {
    dispatch(avatarChange(avatar))
    .unwrap()
    .then(()=>{
      setAvatar(null);
    })
  };

  const handleCredentialsUpdate = async (e) => {
    e.preventDefault();
    dispatch(credentialsUpdate({username,email}))
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

  }, [isModalOpen]);


  return (
   <>
    <Container>
      <div className="flex flex-col max-w-sm mx-auto gap-4 items-center mt-4">
        
    {isModalOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40">
      <PasswordUpdateModal className="z-50 max-w-xl shadow-lg" hide={()=>setIsModalOpen(false)}/>
      </div>}
      {deleteModal && <div className="fixed inset-0 bg-black bg-opacity-50 z-40">
        <ConfirmationModal
          text="Are you sure you want to delete the Account?"
          btn1="Delete"
          btn2="Cancel"
          hide={() => setDeleteModal(false)}
          successMethod={handleDelete}
        />
     </div>}
        <div className="w-28 h-40 rounded-[50%] flex flex-col gap-2 justify-center items-center">
          <div className="h-28 w-full" onClick={handleImageClick}>
            {avatar ? (
              <img
                className="w-full h-full z-10 rounded-[50%] cursor-pointer"
                src={URL.createObjectURL(avatar)}
                alt=""
              />
            ) : (
              <img
                className="w-full rounded-[50%] h-full z-10 cursor-pointer"
                src={userData.data.user.avatar}
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
          {avatar ? (
            <Button disabled={loading}  className="w-40 " onClick={handleAvatarChange}>
              {
                loading ? "Uploading..." : "Upload"
              }
            </Button>
          ) : (
            " "
          )}
        </div>
        <form
          onSubmit={handleCredentialsUpdate}
          className="w-full flex flex-col gap-4"
        >
          <div className="w-full relative">
            <Input
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="w-full relative">
            <Input
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full"
            />
          </div>
          {error ? <p className="text-red-600 text-sm">{error}</p> : ""}
          <Button disabled={loading} className="w-full mt-4 bg-[#407BE3] hover:opacity-80">
            {
              loading ? "Updating..." : "Update"
            }
          </Button>
        </form>
        <Button className="w-full" disabled={loading} onClick={()=>setIsModalOpen(true)}>Update Password</Button>
      </div>
    </Container>

    

    </>
  );
}

export default Profile;
