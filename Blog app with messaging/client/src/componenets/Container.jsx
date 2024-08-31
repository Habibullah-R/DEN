import React from 'react'

function Container({children , className=""}) {
  return (
    <div className={`px-2 max-sm:px-4 max-xl:px-8 max-lg:max-w-3xl max-md:max-w-lg max-xl:max-w-4xl max-w-6xl 2xl:max-w-7xl mx-auto bg-transparent 
      text-white ${className}`}>{children}</div>
  )
}

export default Container;