import { LuBookMinus } from "react-icons/lu";

import { IoTimeOutline } from "react-icons/io5";
import { PiCertificateThin } from "react-icons/pi";
import { BsBarChart } from "react-icons/bs";
import Container from "@/components/container/container";
import Heading from "@/components/Heading/Heading";

const CourseContentList = () => {
  return ( <Container childern={<>
    <Heading title="This Course includes " />
      <div className=" md:px-2 md:px-10  ">

      <div className="
      text-sm
        border-b-[1.3px]
        flex justify-between
        p-3
        ">
          <div className="flex gap-3 ">
          <div className="mt-1"><BsBarChart size={15}/></div>
            <p>Level</p>
          </div>
          <div className="text-slate-400">Grade 12</div>

        </div>

        <div className="
        border-b-[1.3px]
        flex justify-between
        p-3
        text-sm
        ">
          <div className="flex gap-3 ">
          <div className="mt-1"><LuBookMinus size={15}/></div>
            <p>Lessons</p>
          </div>
          <div className="text-slate-400">133</div>

        </div>

        <div className="
        text-sm
        border-b-[1.3px]
        flex justify-between
        p-3
        ">
          <div className="flex gap-3 ">
            <div className="mt-1"><IoTimeOutline size={15}/></div>
            <p>Duration</p>

          </div>
          <div className="text-slate-400">112h 20min</div>

        </div>

        <div className="
        border-b-[1.3px]
        flex justify-between
        p-3
        text-sm
        ">
          <div className="flex gap-3 ">
          <div className="mt-1"><PiCertificateThin size={15}/></div>
            <p>Certifications</p>
          </div>
          <div className="text-slate-400">Yes</div>

        </div>
      </div>
    
      
      </>}/>);
}
 
export default CourseContentList;