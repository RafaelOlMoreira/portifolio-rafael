import React from 'react'

function Projetos() {
    return (
        <div className='font-poppins p-15 h-full w-full bg-[#181818]'>
            <div className='max-w-xl mx-auto text-center space-y-3'>
                <h1 className='font-bold text-4xl text-[#e8e8e8]'>
                    Projetos em destaque
                </h1>
                <p className='dark:text-[#e8e8e8]/60 text-lg'>
                    Aqui estão alguns projetos que eu trabalhei recentemente. Ajudando meus clientes a alcançar seus objetivos.
                </p>
            </div>

            <div className='grid grid-rows-4 pt-15 space-y-10 max-w-5xl mx-auto'>

                <article className='group h-min grid grid-cols-2 border-1 rounded-2xl border-[#e8e8e81e] hover:bg-[#e8e8e80e] overflow-hidden'>
                    <div className='p-5'>
                        <h1 className='text-white text-2xl font-extrabold py-1.5'>Moda masculina | e-commerce</h1>
                        <p className='dark:text-[#e8e8e8]/60'>
                            Plataforma de e-commerce, com catálogo, filtros e páginas de produto otimizadas.
                            Fluxo de compra com carrinho e checkout para integrar gateways de pagamento.
                            Painel administrativo para gerenciar produtos, categorias e estoque.
                            Site com integração de APIs (pagamentos, inventário, analytics).
                        </p>
                        <div className='mt-4 flex flex-wrap items-center gap-2'>
                            <span className='bg-white hover:bg-[#e8e8e8]/60 px-3 py-0.5 rounded-md text-nowrap'>React</span>
                            <span className='bg-white hover:bg-[#e8e8e8]/60 px-3 py-0.5 rounded-md text-nowrap'>Node.js</span>
                            <span className='bg-white hover:bg-[#e8e8e8]/60 px-3 py-0.5 rounded-md text-nowrap'>Tailwind CSS</span>
                            <span className='bg-white hover:bg-[#e8e8e8]/60 px-3 py-0.5 rounded-md text-nowrap'>REST API</span>
                        </div>
                    </div>
                    <div className='ml-auto mt-auto'>
                        <img src="/projeto1.png" className='max-h-65 rounded-2xl translate-x-5 translate-y-5 group-hover:-rotate-5 group-hover:scale-105 transition-all duration-500' />
                    </div>
                </article>

                <article className='group h-min grid grid-cols-2 border-1 rounded-2xl border-[#e8e8e81e] hover:bg-[#e8e8e80e] overflow-hidden'>
                    <div className='p-5'>
                        <h1 className='text-white text-2xl font-extrabold py-1.5'>ComicZone | e-commerce</h1>
                        <p className='dark:text-[#e8e8e8]/60'>
                            Projeto acadêmico web desenvolvido em PHP para um sistema de banca. 
                            Ele permite que usuários com diferentes níveis de permissão (Admin e Organizador e Comprador) possam criar, 
                            visualizar e gerenciar eventos e produtos, enquanto usuários comuns têm acesso apenas às informações públicas.
                        </p>
                        <div className='mt-4 flex flex-wrap items-center gap-2'>
                            <span className='bg-white hover:bg-[#e8e8e8]/60 px-3 py-0.5 rounded-md text-nowrap'>PHP</span>
                            <span className='bg-white hover:bg-[#e8e8e8]/60 px-3 py-0.5 rounded-md text-nowrap'>Tailwind CSS</span>
                            <span className='bg-white hover:bg-[#e8e8e8]/60 px-3 py-0.5 rounded-md text-nowrap'>JavaScript</span>
                            <span className='bg-white hover:bg-[#e8e8e8]/60 px-3 py-0.5 rounded-md text-nowrap'>MySQL</span>    
                        </div>
                    </div>
                    <div className='ml-auto mt-auto'>
                        <img src="/projeto2.png" className='max-h-65 rounded-2xl translate-x-5 translate-y-5 group-hover:-rotate-5 group-hover:scale-105 transition-all duration-500' />
                    </div>
                </article>

                <article className='group h-min grid grid-cols-2 border-1 rounded-2xl border-[#e8e8e81e] hover:bg-[#e8e8e80e] overflow-hidden'>
                    <div className='p-5'>
                        <h1 className='text-white text-2xl font-extrabold py-1.5'>Moda masculina | e-commerce</h1>
                        <p className='dark:text-[#e8e8e8]/60'>
                            Projeto e-commerce para oferecer uma eficiencia na compra de produtos eletrônicos e serviços de uma assistência técnica.
                             O projeto tem como responsabilidade garantir facilidade na navegação e segurança nas transações.
                        </p>
                        <div className='mt-4 flex flex-wrap items-center gap-2'>
                            <span className='bg-white hover:bg-[#e8e8e8]/60 px-3 py-0.5 rounded-md text-nowrap'>React</span>
                            <span className='bg-white hover:bg-[#e8e8e8]/60 px-3 py-0.5 rounded-md text-nowrap'>Node.js</span>
                            <span className='bg-white hover:bg-[#e8e8e8]/60 px-3 py-0.5 rounded-md text-nowrap'>Tailwind CSS</span>
                            <span className='bg-white hover:bg-[#e8e8e8]/60 px-3 py-0.5 rounded-md text-nowrap'>REST API</span>
                        </div>
                    </div>
                    <div className='ml-auto mt-auto'>
                        <img src="/projeto3.png" className='max-h-65 rounded-2xl translate-x-5 translate-y-5 group-hover:-rotate-5 group-hover:scale-105 transition-all duration-500' />
                    </div>
                </article>

                <article className='group h-min grid grid-cols-2 border-1 rounded-2xl border-[#e8e8e81e] hover:bg-[#e8e8e80e] overflow-hidden'>
                    <div className='p-5 min-h-auto'>
                        <h1 className='text-white text-2xl font-extrabold py-1.5'>Bingo em C#</h1>
                        <p className='dark:text-[#e8e8e8]/60'>
                            Jogo de Bingo em C# com suporte a múltiplos jogadores, cartelas aleatórias e registro de partidas em log. 
                            Projeto desenvolvido para praticar conceitos de POO e manipulação de arquivos.
                        </p>
                        <div className='mt-4 flex flex-wrap items-center gap-2'>
                            <span className='bg-white hover:bg-[#e8e8e8]/60 px-3 py-0.5 rounded-md text-nowrap'>Csharp</span>
                            <span className='bg-white hover:bg-[#e8e8e8]/60 px-3 py-0.5 rounded-md text-nowrap'>.NET</span>
                            <span className='bg-white hover:bg-[#e8e8e8]/60 px-3 py-0.5 rounded-md text-nowrap'>POO</span>
                            <span className='bg-white hover:bg-[#e8e8e8]/60 px-3 py-0.5 rounded-md text-nowrap'>Logs</span>
                        </div>
                    </div>
                    <div className='ml-auto mt-auto'>
                        <img src="/projeto4.png" className='max-h-65 rounded-2xl translate-x-5 translate-y-5 group-hover:-rotate-5 group-hover:scale-105 transition-all duration-500' />
                    </div>
                </article>

            </div>
        </div>
    )
}

export default Projetos
