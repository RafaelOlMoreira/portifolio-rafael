import React from 'react'
import { TypeAnimation } from 'react-type-animation'

function Sobre() {
  return (
    <div id='inicio' className='font-poppins pt-15 h-screen w-full bg-[#181818] grid grid-rows-2 items-center justify-items-start
                                xl:grid-cols-2 xl:pt-60'>

      <div className='xl:ml-15 mx-auto'>
        <h1 className='fade-in-esquerda block tracking-wide text-[#e8e8e8] text-center text-nowrap object-cover
                       text-xl md:text-2xl lg:text-3xl xl:text-4xl '>
          Olá! Meu nome é
          <p className='text-4xl font-bold bg-gradient-to-r from-[#03f7e1] to-[#fbfbfb] bg-clip-text text-transparent
                        md:text-5xl lg:text-6xl xl:text-7xl'>
            RAFAEL MOREIRA
          </p>
          <p className='text-xl text-center xl:text-start text-[#e8e8e8]
                        md:text-2xl lg:text-3xl xl:text-4xl'>
            Sou um Dev
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
              className='text-xl md:text-2xl lg:text-3xl xl:text-4xl text-[#03f7e1] font-bold'
              repeat={Infinity}
            />
          </p>
        </h1>

        <div className='justify-center xl:justify-start flex gap-x-4 fade-in-esquerda'>
          <button className='flex mt-4 gap-x-1 items-center border-1 p-1.5 px-3.5 rounded-md text-[#e8e8e8] border-[#e8e8e81e] hover:bg-[#e8e8e81e] hover:cursor-pointer'>
            <a href="#projetos">Veja Meus Trabalhos</a>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
            </svg>
          </button>

          <button className='flex mt-4 gap-x-1 items-center border-1 p-1.5 px-3.5 rounded-md text-black bg-[#e8e8e8] border-[#e8e8e81e] hover:bg-[#e8e8e8cb] hover:cursor-pointer'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
            </svg>
            <a href="#contato">Contate-me</a>
          </button>

        </div>

      </div>

      <div className="relative flex mx-auto items-center fade-in-direita">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"
          className="absolute max-h-screen" >
          <path fill="#03F7E1" d="M55.4,-34.5C63.6,-17.8,56.4,5.3,44.6,23.6C32.8,41.9,16.4,55.4,2.7,53.9C-10.9,52.3,-21.8,35.6,-33.2,17.5C-44.6,-0.6,-56.5,-20,-51.1,-35.2C-45.6,-50.3,-22.8,-61,0.4,-61.3C23.6,-61.5,47.2,-51.2,55.4,-34.5Z" transform="translate(100 100)" />
        </svg>

        <img src="/fotopersona.png" alt="Minha foto"
          className="relative items-center max-h-100 rounded-b-full object-cover
                      xl:max-h-130"
        />
      </div>


    </div>
  )
}

export default Sobre
