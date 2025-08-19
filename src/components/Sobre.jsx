import React from 'react'
import { TypeAnimation } from 'react-type-animation'

function Sobre() {
  return (
    <div className='font-poppins h-screen w-full bg-[#181818] grid grid-cols-2 items-center justify-items-start'>

      <div className=''>
        <h1 className='fade-in-esquerda block text-4xl tracking-wide ml-15 text-[#e8e8e8] text-center'>Olá! Meu nome é
          <p className='font-bold text-7xl bg-gradient-to-r from-[#03f7e1] to-[#fbfbfb] bg-clip-text text-transparent'>RAFAEL MOREIRA</p>
          <p className='text-4xl text-start text-[#e8e8e8]'>Sou um Dev
            <TypeAnimation
              sequence={[
                1500,
                " Web Full Stack",
                2000,
                "",
                200
              ]}
              wrapper='span'
              speed={20}
              className='text-4xl text-[#03f7e1] font-bold'
              repeat={Infinity}
            />
          </p>
        </h1>
      </div>

      <div className="relative flex items-center justify-center fade-in-direita">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"
          className="absolute max-h-screen" >
          <path fill="#03F7E1" d="M55.4,-34.5C63.6,-17.8,56.4,5.3,44.6,23.6C32.8,41.9,16.4,55.4,2.7,53.9C-10.9,52.3,-21.8,35.6,-33.2,17.5C-44.6,-0.6,-56.5,-20,-51.1,-35.2C-45.6,-50.3,-22.8,-61,0.4,-61.3C23.6,-61.5,47.2,-51.2,55.4,-34.5Z" transform="translate(100 100)" />
        </svg>

        <img src="/fotopersona.png" alt="Minha foto"
          className="relative max-h-200 rounded-b-full object-cover"
        />
      </div>


    </div>
  )
}

export default Sobre
