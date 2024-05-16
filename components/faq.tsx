"use client"
import React from 'react'
import {motion,AnimatePresence} from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion'
import { AboutAcademy } from '@/lib/aboutAcademy'

const FAQComponent = () => {
  return (<AnimatePresence>
    <section className="py-20 min-h-screen bg-orange-50 dark:bg-[#0d0d0d]  flex justify-center w-full">
  <motion.div
  initial={{opacity:0, y:15}}
  whileInView={{opacity:1,y:0}}
  exit={{opacity:0, y:15}}
  className="w-full lg:w-8/12  xl:w-6/12  flex flex-col gap-4">
  
  <h1 className='w-full tracking-tight  !leading-tight text-xl text-gray-800 dark:text-gray-100 md:text-4xl font-semibold border-b-2 border-double p-2  border-orange-200 dark:border-gray-700 pl-4'> What to expect from Ethio Exams Academy courses</h1>
  
  
  <Accordion type="single" collapsible className="w-full p-1 mt-32 z-20 " >
  
        {AboutAcademy.map((about:any,index:number) =>{
          return <AccordionItem key={index} value={`${index}`}className="border  bg-white dark:bg-black  border-slate-200 dark:border-gray-600 px-2 md:px-6 m-2 rounded-[6px] ">
          <AccordionTrigger className="hover:no-underline pt-1 py-2" ><div className="text-[14px] pr-2 items-center  tracking-tight !leading-tight w-full flex gap-x-2 text-left  capitalize   ">
           <p className="h-5 w-5 rounded-full bg-green-400  items-center text-center text-sm text-black">{index+1}</p>
           <p className="text-base">{about.title}</p>
            </div></AccordionTrigger>
          <AccordionContent className="bg-background">
            <p className='text-[14px] text-wrap'>{about.content}</p>
          </AccordionContent>
        </AccordionItem>
        })}
  
  
       
        
      </Accordion>
  
  </motion.div>
       
        </section>
  </AnimatePresence>
  )
}

export default FAQComponent