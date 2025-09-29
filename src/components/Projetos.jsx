import React from 'react'

function Projetos() {
    return (
        <div id='projetos' className='font-poppins lg:px-15 px-5 pt-25 h-full w-full bg-[#181818]'>
            <div className='max-w-xl mx-auto text-center space-y-3'>
                <h1 className='font-bold text-4xl text-[#e8e8e8]'>
                    Projetos em destaque
                </h1>
                <p className='text-[#e8e8e8]/60 text-lg'>
                    Aqui estão alguns projetos que eu trabalhei recentemente. Melhorando minhas habilidades e buscando alcançar meus objetivos.
                </p>
            </div>

            <div className='grid pt-15 space-y-10 max-w-5xl mx-auto'>

                <article className='group grid lg:grid-cols-2 border-1 rounded-2xl border-[#e8e8e81e] hover:bg-[#e8e8e80e] overflow-hidden'>
                    <div className='lg:order-2 mx-3 md:mx-25 lg:mx-0 mt-auto'>
                        <img src="/projeto1.png" className='max-h-100 rounded-2xl p-2 lg:translate-x-5 lg:translate-y-5 lg:group-hover:-rotate-5 lg:group-hover:scale-105 lg:transition-all lg:duration-500' />
                    </div>
                    <div className='p-5 lg:order-1'>
                        <h1 className='text-white text-2xl font-extrabold py-1.5'>JA Grifes</h1>
                        <p className='text-[#e8e8e8]/60'>
                            Desenvolvi uma plataforma completa de e-commerce com foco em performance e escalabilidade. 
                            Inclui catálogo dinâmico com filtros avançados, fluxo de compra com carrinho e checkout integrados a gateways de pagamento, 
                            painel administrativo para gerenciamento de produtos, categorias e estoque em tempo real.
                        </p>
                        <div className='mt-4 flex flex-wrap items-center gap-2'>
                            <span className='bg-white hover:bg-[#e8e8e8]/60 px-3 py-0.5 rounded-md text-nowrap'>React</span>
                            <span className='bg-white hover:bg-[#e8e8e8]/60 px-3 py-0.5 rounded-md text-nowrap'>Node.js</span>
                            <span className='bg-white hover:bg-[#e8e8e8]/60 px-3 py-0.5 rounded-md text-nowrap'>Tailwind CSS</span>
                            <span className='bg-white hover:bg-[#e8e8e8]/60 px-3 py-0.5 rounded-md text-nowrap'>REST API</span>
                        </div>
                    </div>
                </article>

                <article className='group grid lg:grid-cols-2 border-1 rounded-2xl border-[#e8e8e81e] hover:bg-[#e8e8e80e] overflow-hidden'>
                    <div className='lg:order-2 mx-3 md:mx-25 lg:mx-0 mt-auto'>
                        <img src="/projeto2.png" className='max-h-100 rounded-2xl p-2 lg:translate-x-5 lg:translate-y-5 lg:group-hover:-rotate-5 lg:group-hover:scale-105 lg:transition-all lg:duration-500' />
                    </div>
                    <div className='p-5 lg:order-1'>
                        <h1 className='text-white text-2xl font-extrabold py-1.5'>ComicZone</h1>
                        <p className='text-[#e8e8e8]/60'>
                            Projeto acadêmico em PHP para um sistema de gestão de eventos estilo ‘banca’. 
                            O sistema contempla níveis de permissão (Admin, Organizador, Comprador), 
                            permitindo criação, visualização e gerenciamento de eventos e produtos, 
                            com painel diferenciado para usuários comuns e lógica de acesso controlado.
                        </p>
                        <div className='mt-4 flex flex-wrap items-center gap-2'>
                            <span className='bg-white hover:bg-[#e8e8e8]/60 px-3 py-0.5 rounded-md text-nowrap'>PHP</span>
                            <span className='bg-white hover:bg-[#e8e8e8]/60 px-3 py-0.5 rounded-md text-nowrap'>Tailwind CSS</span>
                            <span className='bg-white hover:bg-[#e8e8e8]/60 px-3 py-0.5 rounded-md text-nowrap'>JavaScript</span>
                            <span className='bg-white hover:bg-[#e8e8e8]/60 px-3 py-0.5 rounded-md text-nowrap'>MySQL</span>
                        </div>
                    </div>
                </article>

                <article className='group grid lg:grid-cols-2 border-1 rounded-2xl border-[#e8e8e81e] hover:bg-[#e8e8e80e] overflow-hidden'>
                    <div className='lg:order-2 mx-3 md:mx-25 lg:mx-0 mt-auto'>
                        <img src="/projeto3.png" className='max-h-100 rounded-2xl p-2 lg:translate-x-5 lg:translate-y-5 lg:group-hover:-rotate-5 lg:group-hover:scale-105 lg:transition-all lg:duration-500' />
                    </div>
                    <div className='p-5 lg:order-1'>
                        <h1 className='text-white text-2xl font-extrabold py-1.5'>CR Tech Store</h1>
                        <p className='text-[#e8e8e8]/60'>
                            Desenvolvi uma loja virtual moderna com foco em usabilidade e design responsivo. 
                            Construída com React, Next.js, Tailwind CSS e TypeScript, 
                            a aplicação destaca-se pela experiência fluida do usuário e pela reutilização de componentes, 
                            facilitando manutenção e escalabilidade do código.
                        </p>
                        <div className='mt-4 flex flex-wrap items-center gap-2'>
                            <span className='bg-white hover:bg-[#e8e8e8]/60 px-3 py-0.5 rounded-md text-nowrap'>React.js</span>
                            <span className='bg-white hover:bg-[#e8e8e8]/60 px-3 py-0.5 rounded-md text-nowrap'>Next.js</span>
                            <span className='bg-white hover:bg-[#e8e8e8]/60 px-3 py-0.5 rounded-md text-nowrap'>Tailwind CSS</span>
                            <span className='bg-white hover:bg-[#e8e8e8]/60 px-3 py-0.5 rounded-md text-nowrap'>TypeScript</span>
                        </div>
                    </div>
                </article>

                <article className='group grid lg:grid-cols-2 border-1 rounded-2xl border-[#e8e8e81e] hover:bg-[#e8e8e80e] overflow-hidden'>
                    <div className='lg:order-2 mx-3 md:mx-25 lg:mx-0 mt-auto'>
                        <img src="/projeto4.png" className='max-h-100 rounded-2xl p-2 lg:translate-x-5 lg:translate-y-5 lg:group-hover:-rotate-5 lg:group-hover:scale-105 lg:transition-all lg:duration-500' />
                    </div>
                    <div className='p-5 lg:order-1'>
                        <h1 className='text-white text-2xl font-extrabold py-1.5'>Bingo em C#</h1>
                        <p className='text-[#e8e8e8]/60'>
                            Criação de um jogo de Bingo em C#, com suporte a múltiplos jogadores, geração aleatória de cartelas, 
                            gerenciamento de partidas e registro em log. 
                            Projeto ideal para aprofundar conceitos de programação orientada a objetos e manipulação de arquivos, 
                            reforçando boas práticas de estrutura e persistência.
                        </p>
                        <div className='mt-4 flex flex-wrap items-center gap-2'>
                            <span className='bg-white hover:bg-[#e8e8e8]/60 px-3 py-0.5 rounded-md text-nowrap'>Csharp</span>
                            <span className='bg-white hover:bg-[#e8e8e8]/60 px-3 py-0.5 rounded-md text-nowrap'>.NET</span>
                            <span className='bg-white hover:bg-[#e8e8e8]/60 px-3 py-0.5 rounded-md text-nowrap'>POO</span>
                            <span className='bg-white hover:bg-[#e8e8e8]/60 px-3 py-0.5 rounded-md text-nowrap'>Logs</span>
                        </div>
                    </div>
                </article>

            </div>
        </div>
    )
}

export default Projetos
