//import React from 'react'

import { forwardRef } from "react"

function Input({
  label,
  type = "text",
  placeholder,
  className="",
  id="",
  ...props
}, ref) {
  return (
    <div className="w-full bg-gray-500 rounded-lg p-2 py-3 mb-4 shadow-md shadow-gray-900">
       {label && <label 
            className='inline-block mb-1 pl-1 text-[#FFD700] font-bold' 
            htmlFor={id}>
                {label}
            </label>
            }
            <input
            type={type}
            className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 focus:outline-[#FFD700] duration-200 border border-gray-200 w-full  ${className} `}
            ref={ref}
            {...props}
            id={id}
            />
    </div>
  )
}

export default forwardRef(Input)
