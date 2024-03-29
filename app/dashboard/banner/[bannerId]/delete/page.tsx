
import { getBannerById } from "@/actions/banner/getbannerById";
import DeleteBannerClient from "./bannerDeleteClient";



const Deletebanner =async ({params}:{params:{bannerId:string}}) => {
 const banner=await getBannerById(params.bannerId);
 
  return (<DeleteBannerClient banner={banner}/>
  )
}

export default Deletebanner