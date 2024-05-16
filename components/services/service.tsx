"use client"

import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import {motion} from "framer-motion"
import { servicesData } from '@/lib/serviceData';

const ServicesComponent = () => {
    const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 640);
    };

    handleResize(); // Check on initial render
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <section id='service' className='bg-green-100 z-20 dark:bg-zinc-900 px-2 py-10 md:px-10 md:py-32 flex justify-center w-full'>
        <div className="">
  
   <h1 className='w-full tracking-tight  !leading-tight text-xl text-gray-800 dark:text-gray-100 md:text-4xl font-semibold border-b-2 border-double p-2  border-green-300 dark:border-gray-700 pl-4'> Our Services</h1>
            <div className="flex mt-32 justify-center w-full">
            <div className="flex flex-col gap-10 w-full md:w-11/12 lg:w-10/12 xl:w-8/12 ">
                {
                   servicesData.map((service,index) =>{
                    const isEven = index % 2 === 0;
                    return  <motion.div
                    initial={{opacity:0,y:15}}
                    whileInView={{opacity:1,y:0}}
                    
                     key={index} className="bg-white  dark:bg-slate-900 shadow-md rounded-[10px] space-y-6 p-2 pt-4 md:p-4">
                    <h2 className='text-lg md:text-2xl leading-6 font-semibold'>{service.title}</h2>
                    <div className={`  grid grid-cols-1 lg:grid-cols-2 gap-10  w-full `}>
                        <motion.div 
                        initial={isDesktop?{opacity:0,x:-50}:""}
                        whileInView={{opacity:1,x:0}}
                        transition={{delay:0.2, duration:0.5}}
                        className={`${isEven ? '' : 'lg:order-last'} flex justify-center items-center`}>
                         <ul className='  p-0 space-y-4 list-disc list-inside'>
                            {service.description.map((des,ind)=>{
                                return <li className='flex text-lg items-start' key={ind}>
                                    <svg className="w-4 h-4 me-2 mt-1 text-green-500 dark:text-green-400 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
         </svg>
                                    <span className=' tracking-tight text-[16px] md:text-[18px]'>{des.content}</span></li>
                            })}
                         </ul>
                        </motion.div>

                        <motion.div 
                       initial={isDesktop?{opacity:0,x:50}:""}
                        whileInView={{opacity:1,x:0}}
                        transition={{delay:0.2, duration:0.5}}
                        className="w-full">
                            <Image height={400} width={400} src={service.image} alt='service image'/>
                        </motion.div>
                    </div>
                </motion.div>
                   })
                }
            </div>

            </div>
        </div>
    </section>
  )
}

export default ServicesComponent