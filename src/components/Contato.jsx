import React from 'react'

function Contato() {
    return (
        <div id='contato' className='font-poppins px-15 p-25 bg-[#181818]'>
            <div className='mx-auto text-center'>
                <h1 className='font-bold text-4xl text-[#e8e8e8]'>
                    Contato
                </h1>
                <p className='text-[#e8e8e8]/60 mx-2'>
                    Tem um projeto ou dúvida? Entre em contato pelo formulário abaixo ou envie um e-mail, adoraria ouvir de você.
                    <p className='my-3'>Email: rafael150305@gmail.com</p>
                </p>
            </div>

            <form action="post" className='grid grid-rows-2 h-auto'>
                <div className='grid md:grid-cols-2 gap-5 my-auto'>

                    <label htmlFor="nome" className='text-white text-lg'>Nome
                        <input type="text" name="nome" id="" placeholder='Walter White'
                            className='border-2 border-[#e8e8e81e] rounded-lg p-2 mt-2 text-white placeholder:text-[#e8e8e8]/60 w-full' />
                    </label>
                    <label htmlFor="email" className='text-white text-lg'>Email
                        <input type="email" name="email" id="" placeholder='r@exemplo.com'
                            className='border-2 border-[#e8e8e81e] rounded-lg p-2 mt-2 text-white placeholder:text-[#e8e8e8]/60 w-full' />
                    </label>
                </div>

                <div>
                    <label htmlFor="mensagem" className='text-white text-lg' >Mensagem</label>
                    <textarea name="mensagem" id="mensagem" rows="5" placeholder='Escreva aqui sua mensagem...'
                        className='resize-none border-2 border-[#e8e8e81e] rounded-lg p-2 mt-2 text-white placeholder:text-[#e8e8e8]/60 w-full text-start'></textarea>
                    <button className='flex mt-4 p-2 px-5 border-2 border-[#e8e8e81e] hover:border-[#e8e8e862] cursor-pointer rounded-lg text-white items-center ml-auto'>
                        Enviar
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5 ml-2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                        </svg>
                    </button>
                </div>
            </form>

        </div>
    )
}

export default Contato
