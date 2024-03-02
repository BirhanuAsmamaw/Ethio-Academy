import { getCourses } from "@/actions/courses/getCourses";
import { getAllPayments } from "@/actions/payments/getAllPayments";
import { getAllUsers } from "@/actions/users/getAllUsers";
import DashboardCard from "@/components/card/summaryCard";
import { BsPeople } from "react-icons/bs";
import { FaBuyNLarge } from "react-icons/fa";
import { IoIosPricetags } from "react-icons/io";
import { SiCoursera } from "react-icons/si";

const Dashboard = async() => {
  const users=await getAllUsers();
  const courses=await getCourses();
  const boughtCourses=await getAllPayments();
  return ( <div className="pt-20 flex flex-col items-center gap-20 w-full">
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 items-center text-center gap-4 justify-center w-full">
    <DashboardCard icon={BsPeople} content={`${users?.length ||0 }`} label="Students"/>
    <DashboardCard icon={SiCoursera} content={`${courses?.length ||0 }`} label="courses"/>
    <DashboardCard  icon={FaBuyNLarge} content={`${boughtCourses?.length ||0 }`} label="Payed Courses"/>
    <DashboardCard  icon={IoIosPricetags} content="64,3234" label="Total Price(ETB)"/>
  </div>
  </div> );
}
 
export default Dashboard;