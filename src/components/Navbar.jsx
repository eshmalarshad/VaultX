import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-[#0F172A] text-white'>
      <div className="mycontainer flex justify-between items-center px-4 py-5 h-14 ">
        <div className="logo font-bol text-2xl">
          <span className='text-[#A0EDE6]'></span>
          <span>Vault</span>
          <span className='text-[#A0EDE6]'>X</span>
        </div> 
        {/* <ul>
          <li className='flex gap-4'>
            <a className='hover:font-bold' href="/">Home</a>
            <a className='hover:font-bold' href="#">About</a>
            <a className='hover:font-bold' href="#">Contact</a>
          </li>
        </ul> */}
        <button className='text-white bg-[#517774] my-5 rounded-full flex justify-center items-center ring-white ring-1'>
          
          <img className='invert w-10 p-1' src="/icons/github.svg" alt="" />
        <span className='font-bold px-2'> Github</span>
       
        </button>
      </div>
    </nav>
  )
}

export default Navbar
