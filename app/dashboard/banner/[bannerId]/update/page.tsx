import React from 'react'
import UpdatebannerContent from './content'
import UpdatebannerFile from './file'
import { getBannerById } from '@/actions/banner/getbannerById'



const Updatebanner = async({params}:{params:{bannerId:string}}) => {
  const banner=await getBannerById(params.bannerId)
  return (<div className="min-h-screen w-full flex justify-center items-center">

     <div className="w-full lg:w-11/12 xl:px-20 xl:8/12 flex flex-col gap-6 items-center">
      <UpdatebannerContent banner={banner}/>
      <UpdatebannerFile banner={banner}/>
     </div>
  </div>
  )
}

export default Updatebanner