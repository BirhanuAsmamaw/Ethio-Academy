import React, { ReactNode } from 'react'
interface Bannerprops{
  title:string;
  children:ReactNode

}
const Banner:React.FC<Bannerprops> = ({title,children}) => {
  return (
    <div className="w-full rounded-[10px]  p-2 bg-[url('../public/lightBanner.png')] dark:bg-[url('../public/darkBanner.png')] ">
      <div className='space-y-10'>
    
    <div className="flex  justify-center items-center h-[200px] lg:h-[400px]">
      <h1 className=' text-xl md:text-2xl lg:text-4xl xl:text-6xl text-blue-700 
      dark:text-white font-bold xl:font-extra-bold'>{title}</h1>

    </div>
    <div className="">{children}</div>
   
</div>
    </div>
  )
}

export default Banner