import Image from 'next/image'
import React from 'react'

const Loading = () => {
  return (
    <div className='h-screen w-screen flex  justify-center items-start mt-12 '>
        <h1>loading</h1>
        <Image src="@public/assets/images/loading.svg" alt="loading" width={20} height={20} />
    </div>
  )
}

export default Loading;