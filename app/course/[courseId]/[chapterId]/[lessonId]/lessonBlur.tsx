
"use client"
import Container from "@/components/container/container";
import { useRouter } from "next/navigation";

const LessonBlur = () => {
  const router=useRouter();
  return ( <div className="flex justify-center items-center h-screen w-full bg-black bg-opacity-30">
    <Container
    childern={
      <div className="p-2 flex flex-col gap-2">
        <button
          onClick={()=>{
            
            router.push(`/payment`);
         }}
          className="text-white bg-green-500 px-4 py-2 rounded-[5px] mr-2 hover:bg-green-600 focus:outline-none"
        >
          Buy Course Now!
        </button>

        <button
          onClick={()=>{
            router.push(`/course/tray`);
            
          }}
          className="text-white bg-blue-500 px-4 py-2 rounded-[5px] hover:bg-blue-600 focus:outline-none"
        >
          See Tray Course!
        </button>
        
      </div>
    }/>

  </div> );
}
 
export default LessonBlur;