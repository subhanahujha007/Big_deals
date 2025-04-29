import React from 'react'
import { CiSearch } from "react-icons/ci";

const Search = () => {
  return (
    <div className='w-full mx-auto items-center flex justify-center' >
        <input placeholder='Find Exciting items here' className='w-[40%] text-gray-900 italic text-md bg-white rounded-l-lg p-2'/>
        <button className='bg-orange-600 rounded-r-md flex justify-between items-center w-[42px] h-[42px]'><CiSearch size={30}/></button>
    </div>
  )
}

export default Search