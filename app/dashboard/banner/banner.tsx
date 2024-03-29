import { Link } from "lucide-react";

interface BannerProps {
  banner:any
}
const Banner:React.FC<BannerProps>  = ({banner}) => {
  return ( <div className=" w-full flex justify-center items-center p-2">
    <div className='space-y-6  bg-white dark:bg-gray-800 w-full md:w-8/12 xl:1/2 p-2 rounde-[10px]'>
    <h1 className="text-xl font-semibold">{banner?.title}</h1>
      <h2 className="text-lg font-medium">{banner?.subtitle? banner?.subtitle:""}</h2>
      <div className=" flex justify-end w-full px-4 gap-2">
        
         <Link href={`/dashboard/banner/${banner?.id}/update`}>Edit</Link>
         <Link href={`/dashboard/banner/${banner?.id}/delete`}>Delete</Link>
      </div>
      </div>
    </div>
  
  );
}
 
export default Banner ;