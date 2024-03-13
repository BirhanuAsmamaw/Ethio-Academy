
import Banner from '@/components/banner'
import YearExamCard from '@/components/card/yearExamsCard'
import Navbar from '@/components/navbar/Navbar'
import { examsYears } from '@/lib/examsYear'
import React from 'react'
import BuyExamButton from '../buyExamButton'

const SPHMMECPage = () => {
  return (
    <>
    <Navbar/>
    <div className='min-h-screen w-full flex flex-col gap-10  pt-10'>
     <div className="p-4 md:p-6 lg:p-10 xl:p-20">
     <Banner title="St.Paul's Hospital Millennium Medicine Entrance COC Exams<">
      <BuyExamButton/>
      </Banner>
     </div>

     <div className="flex justify-center p-4 py-10">
        <div className="w-full gap-4 lg:w-10/12 xl:w-8/12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
         {examsYears.map((year,index)=>{
          return <YearExamCard key={index} year={year} url={`/SPHMMEC/${year}`}/>
         })}
         
          
        </div>
      </div>

    </div>
    </>
  )
}

export default SPHMMECPage