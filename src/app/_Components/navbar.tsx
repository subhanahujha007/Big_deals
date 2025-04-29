import React from 'react'
import Search from './search'

const Navbar = () => {
  return (
    <div className='w-[100vw] h-[15vh] items-center px-3 flex flex-row justify-between bg-blue-400 text-white'>
        <div className='w-[10%] font-bold text-[20px] text-purple-950 italic'>
            BIG DEALS
        </div>
        <Search/>
        <div>Cart</div>
    </div>
  )
}

export default Navbar