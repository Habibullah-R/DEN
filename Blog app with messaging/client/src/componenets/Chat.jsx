import React from 'react'
import { useSelector } from 'react-redux'

const Chat = ({chats}) => {
  const { userData } = useSelector(state=>state.user);
  return (
    <>
    <div className={userData.data.user._id === chats.senderId ? `px-3 w-full flex gap mt-2 justify-end` :
  `w-full flex gap mt-1 px-3`
  }>
      <p className={ userData.data.user._id === chats.senderId ? `bg-[#005C4B] rounded-md p-2 inline-block` :
      `bg-gray-600 rounded-md p-2 inline-block`
    }>{chats.message}</p>
    </div>
    </>
  )
}

export default Chat