
"use client"
import Container from "@/components/container/container";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const LessonBlur = () => {
  const router=useRouter();
  const [reloadPage, setReloadPage] = useState(false);

  useEffect(() => {
    // Set a timeout to reload the page after 1 minute (60,000 milliseconds)
    const timeoutId = setTimeout(() => {
      setReloadPage(true);
    }, 6000);

    // Cleanup the timeout when the component unmounts
    return () => clearTimeout(timeoutId);
  }, []);

  
  return ( <>{reloadPage&&<div className="fixed z-50 flex justify-center items-center h-screen w-full bg-black bg-opacity-60">
    <Container
    childern={
      <div className="p-2 flex flex-col gap-10 w-72">
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

  </div>}</> );
}
 
export default LessonBlur;