import React from 'react'

const SearchUser = ({User , onClick}) => {
  return (
    <>
    <div onClick={()=>onClick(User)} className='h-[50px] cursor-pointer hover:bg-gray-700 p-2 flex rounded-md gap-2 mb-3 items-center'>
      <img className='rounded-[50%] h-full' src={User.avatar} alt="" />
      <h2>{User.username}</h2>
    </div>
    <div className="divider"></div>
    </>
  )
}

export default SearchUser