import { getBanner } from "@/actions/banner/getbanner";
import Banner from "./banner";
import BannerCreate from "./bannerCreate";

const BannerPage = async() => {
  const banner = await getBanner()
  
  return ( <div className="min-h-screen w-full flex justify-center items-center">

    <div className="w-full space-y-10">
      <BannerCreate />

      {banner?<Banner banner={banner}/>:""}
    </div>
  </div> );
}
 
export default BannerPage;