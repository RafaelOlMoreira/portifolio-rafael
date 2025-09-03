import React from 'react'

function Footer() {
    return (
        <div className='font-poppins h-auto bg-[#181818]'>
            <div className='border-t-1 border-[#e8e8e81e] mx-16 p-4'>
                <div className='grid grid-cols-2 items-center w-1/2 mx-auto'>
                    <div className='mr-auto text-[#e8e8e8] text-lg'>
                        <span>© 2025 Rafael Oliveira Moreira</span>
                    </div>
                    <div className='ml-auto flex space-x-4'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" className='hover:cursor-pointer'><g fill="none" stroke="#e8e8e8" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><path d="M9.096 21.25v-3.146a3.33 3.33 0 0 1 .758-2.115c-3.005-.4-5.28-1.859-5.28-5.798c0-1.666 1.432-3.89 1.432-3.89c-.514-1.13-.5-3.084.06-3.551c0 0 1.95.175 3.847 1.75c1.838-.495 3.764-.554 5.661 0c1.897-1.575 3.848-1.75 3.848-1.75c.558.467.573 2.422.06 3.551c0 0 1.432 2.224 1.432 3.89c0 3.94-2.276 5.398-5.28 5.798a3.33 3.33 0 0 1 .757 2.115v3.146"/><path d="M3.086 16.57c.163.554.463 1.066.878 1.496c.414.431.932.77 1.513.988a4.46 4.46 0 0 0 3.62-.216"/></g></svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 14 14" className='hover:cursor-pointer'><path fill="none" stroke="#e8e8e8" stroke-linecap="round" stroke-linejoin="round" d="M3.574 1.767a1.316 1.316 0 0 1-1.287 1.326A1.346 1.346 0 0 1 .99 1.767A1.326 1.326 0 0 1 2.287.5a1.316 1.316 0 0 1 1.287 1.267M1.129 5.449c0-.762.485-.643 1.158-.643c.673 0 1.148-.119 1.148.643v7.424c0 .772-.485.614-1.148.614c-.663 0-1.158.158-1.158-.614zm4.306.001c0-.426.158-.585.405-.634c.248-.05 1.099 0 1.396 0c.297 0 .416.485.406.851a2.485 2.485 0 0 1 2.217-.99a2.97 2.97 0 0 1 3.148 3.098v5.068c0 .772-.475.614-1.149.614c-.673 0-1.148.158-1.148-.614V8.884A1.425 1.425 0 0 0 9.206 7.34A1.435 1.435 0 0 0 7.74 8.914v3.959c0 .772-.485.614-1.158.614c-.673 0-1.148.158-1.148-.614V5.449Z"/></svg>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer
