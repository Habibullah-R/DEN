import React from 'react'
import { Bars } from 'react-loader-spinner'

function Loader() {
  return (
    <div className='w-full z-50 h-full flex items-center justify-center'>
      <Bars
  height="20"
  width="80"
  color="white"
  ariaLabel="bars-loading"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
  />
    </div>
    
  )
}

export default Loader