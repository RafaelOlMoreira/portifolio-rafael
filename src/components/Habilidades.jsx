import React from 'react'

function Habilidades() {
    return (
        <div className='font-poppins p-15 h-min w-full bg-[#181818]'>
            <div className='text-center'>
                <h1 className='font-bold text-4xl text-[#e8e8e8]'>
                    Habilidades
                </h1>
                <p className='dark:text-[#e8e8e8]/60'>
                    Aqui estão algumas das tecnologias com as quais trabalho
                </p>
            </div>
            <div className='text-gray-200 text-center justify-center text-lg mt-20 max-w-5xl space-x-2.5 space-y-2.5 mx-auto flex flex-wrap'>
                
                <span className='p-3 border-1 border-[#e8e8e8]/60 rounded-2xl'>React</span>
                <span className='p-3 border-1 border-[#e8e8e8]/60 rounded-2xl'>Tailwind CSS</span>
                <span className='p-3 border-1 border-[#e8e8e8]/60 rounded-2xl'>C#</span>
                <span className='p-3 border-1 border-[#e8e8e8]/60 rounded-2xl'>PHP</span>
                <span className='p-3 border-1 border-[#e8e8e8]/60 rounded-2xl'>Node.js</span>
                <span className='p-3 border-1 border-[#e8e8e8]/60 rounded-2xl'>Rest API</span>
                <span className='p-3 border-1 border-[#e8e8e8]/60 rounded-2xl'>Styled Components</span>
                <span className='p-3 border-1 border-[#e8e8e8]/60 rounded-2xl'>MySQL</span>
                <span className='p-3 border-1 border-[#e8e8e8]/60 rounded-2xl'>GitHub</span>
                <span className='p-3 border-1 border-[#e8e8e8]/60 rounded-2xl'>Git</span>
                <span className='h-min p-3 border-1 border-[#e8e8e8]/60 rounded-2xl'>Vercel</span>
            </div>
        </div>
    )
}

export default Habilidades
