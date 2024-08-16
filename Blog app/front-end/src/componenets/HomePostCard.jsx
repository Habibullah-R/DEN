import React from 'react'
import { Link } from 'react-router-dom'

function HomePostCard({post}) {
  return (
    <>
    <Link className='max-md:w-full max-xl:w-[48%] xl:w-[32%]' to={`/post/${post.slug}`}>
    <div className="cursor-pinter h-[420px] max-md:w-full w-full max-xl:w-full mt-5 w-[350px] border border-gray-700 bg-[#1F2937] rounded-md">
        <img className="object-fit w-full h-[220px] rounded-md" src={post.image} alt="" />
        <p className='px-2 text-sm mt-4'>Last updated : {post.updatedAt.slice(0,10)}</p>
        <hr className='mx-2 mb-2'/>
        <div className="p-2 mb-4">
          <h2 className="text-2xl font-semibold">{post.title.slice(0,80)}</h2>
        </div>
      </div>
      </Link>
      </>
  )
}

export default HomePostCard