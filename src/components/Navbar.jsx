import React from 'react'

function Navbar() {
    return (
        <div className='absolute font-poppins bg-[#181818] text-[#e8e8e8] w-full'>
            <nav className='h-20 px-10 grid grid-cols-3 items-center shadow-xl '>
                <div className=''>
                    Logo
                </div>
                <div className='text-lg'>   
                    <ul className='md:flex hidden gap-x-10 justify-center'>
                        <li className='hover:cursor-pointer hover:text-[#9CA3AF] hover:border-b transition-all duration-200'>Início</li>
                        <li className='hover:cursor-pointer hover:text-[#9CA3AF] hover:border-b transition-all duration-200'>Projetos</li>
                        <li className='hover:cursor-pointer hover:text-[#9CA3AF] hover:border-b transition-all duration-200'>Habilidades</li>
                        <li className='hover:cursor-pointer hover:text-[#9CA3AF] hover:border-b transition-all duration-200'>Contato</li>
                    </ul>
                </div>
                <div className='flex justify-end md:hidden'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-8">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
