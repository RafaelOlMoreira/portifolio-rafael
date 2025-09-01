import React from 'react'

function Contato() {
    return (
        <div id='contato' className='font-poppins px-15 p-25 h-auto w-full bg-[#181818]'>
            <div className='mx-auto text-center max-w-1/3'>
                <h1 className='font-bold text-4xl text-[#e8e8e8]'>
                    Contato
                </h1>
                <p className='dark:text-[#e8e8e8]/60'>
                    Tem um projeto ou dúvida? Entre em contato pelo formulário abaixo ou envie um e-mail, adoraria ouvir de você.
                </p>
            </div>
            <form action="post" className='max-w-1/2 mx-auto mt-15'>
                <div className='grid grid-cols-2 space-x-3 mb-6'>
                    <div>
                        <label htmlFor="nome" className='text-white text-lg'>Nome</label>
                        <input type="text" name="nome" id="" placeholder='Rafael Moreira'
                            className='border-2 border-[#e8e8e81e] rounded-lg p-2 mt-2 text-white placeholder:dark:text-[#e8e8e8]/60 w-full' />
                    </div>

                    <div>
                        <label htmlFor="email" className='text-white text-lg'>Email</label>
                        <input type="email" name="email" id="" placeholder='r@gmail.com'
                            className='border-2 border-[#e8e8e81e] rounded-lg p-2 mt-2 text-white placeholder:dark:text-[#e8e8e8]/60 w-full' />
                    </div>
                </div>
                <label htmlFor="mensagem" className='text-white text-lg' >Mensagem</label>
                <textarea name="mensagem" id="mensagem" rows="5" placeholder='Escreva aqui sua mensagem...'
                    className='resize-none border-2 border-[#e8e8e81e] rounded-lg p-2 mt-2 text-white placeholder:dark:text-[#e8e8e8]/60 w-full text-start'></textarea>
                <button className='flex mt-4 p-2 px-5 border-2 border-[#e8e8e81e] hover:border-[#e8e8e862] cursor-pointer rounded-lg text-white items-center ml-auto'>
                    Enviar
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5 ml-2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                </button>
            </form>
        </div>
    )
}

export default Contato
