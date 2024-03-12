import React, { ReactNode } from 'react'
interface Bannerprops{
  title:string;

}
const Banner:React.FC<Bannerprops> = ({title}) => {
  return (
    <div className="w-full rounded-[10px]  p-2 bg-[url('../public/lightBanner.png')] dark:bg-[url('../public/darkBanner.png')] ">
      <div className='space-y-10'>
    
    <div className="flex  justify-center items-center h-[200px] lg:h-[400px]">
      <h1 className=' text-xl md:text-2xl lg:text-4xl xl:text-6xl text-blue-700 
      dark:text-white font-bold xl:font-extra-bold'>{title}</h1>

    </div>
    <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-lg font-bold text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
<span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
Buy Exams Now!
</span>
</button>
<button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-lg font-bold text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
<span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
See Tray Exams
</span>
</button>
</div>
    </div>
  )
}

export default Banner