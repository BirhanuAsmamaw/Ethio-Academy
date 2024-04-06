import { getCourses } from "@/actions/courses/getCourses";
import { getAllPayments } from "@/actions/payments/getAllPayments";
import { getAllUsers } from "@/actions/users/getAllUsers";
import DashboardCard from "@/components/card/summaryCard";
import { BsPeople } from "react-icons/bs";
import { FaBuyNLarge } from "react-icons/fa";
import { IoIosPricetags } from "react-icons/io";
import { SiCoursera } from "react-icons/si";
import CoursesBoughtChart from "./charts/courseBoughtChart";
import TotalPricesInMonth from "./charts/totalPriceChart";

const Dashboard = async() => {
  const users=await getAllUsers();
  const courses=await getCourses(2);
  const boughtCourses=await getAllPayments();
  return ( <div className="py-20 flex flex-col items-center gap-20 w-full">
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 items-center text-center gap-4 justify-center w-full">
    <DashboardCard icon={BsPeople} content={`${users?.length ||0 }`} label="Students"/>
    <DashboardCard icon={SiCoursera} content={`${courses?.count ||0 }`} label="courses"/>
    <DashboardCard  icon={FaBuyNLarge} content={`${boughtCourses?.length ||0 }`} label="Payed Courses"/>
    <DashboardCard  icon={IoIosPricetags} content="64,000" label="Total Price(ETB)"/>

    
  </div>


  <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-medium"> Courses Bought in Months</h1>

<div className=" overflow-x-auto scroll-x-auto  p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 w-full ">
 
<CoursesBoughtChart coursesData={courses?.courses}/>
</div>
     
      </div>



    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-medium">Total Prices of Courses Bought  in Months</h1>

<div className=" overflow-x-auto scroll-x-auto  p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 w-full ">
 
<TotalPricesInMonth coursesData={courses?.courses}/>
</div>
     
      </div>

  
  </div> );
}
 
export default Dashboard;