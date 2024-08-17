import Navbar from '@/components/Navbar'
import { BackgroundBeams } from '@/components/ui/background-beams'
import { UserButton } from '@clerk/nextjs'
import React from 'react'


const page = () => {
  return (

    <>

    <Navbar/>
    <UserButton/>
     <div className="h-[40rem] w-full rounded-md bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="relative z-10 text-lg md:text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold">
          Effortlessly Crop
        </h1>
        <h1 className="relative z-10 text-lg md:text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold">
          And Resize Your Media
        </h1>
        <p></p>
        <h2 className="my-4 font-normal text-center mt-2 md:mt-6 text-base md:text-xl text-muted dark:text-muted-dark max-w-3xl mx-auto relative z-10">
          Advanced AI Tools for Quick and Precise Image and Video Optimization
        </h2>
        
        
      </div>
      <BackgroundBeams />
    </div>
    </>
  )
}

export default page