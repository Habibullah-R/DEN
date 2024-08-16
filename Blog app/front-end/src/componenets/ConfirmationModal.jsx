import React from 'react'
import { Button } from "./"

function ConfirmationModal({className, text , btn1 ,btn2 , hide ,successMethod}) {
  return (
    <div className={`${className} absolute w-[300px] z-50 h-40 left-[50%] top-[50%] -translate-x-2/4
      bg-[#1F2937] p-3 rounded-md -translate-y-2/4`}>
        <div className='flex flex-col gap-5 px-2 py-3'>
            <p>{text}</p>
         <div className='flex gap-3 justify-center'>
            <Button onClick={successMethod} className='bg-red-500'>{btn1}</Button>
            <Button onClick={hide}>{btn2}</Button>
         </div>
          </div>
      </div>
  )
}

export default ConfirmationModal