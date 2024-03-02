import { getCourses } from "@/actions/courses/getCourses";
import Card from "@/components/card/card";

import Navbar from "@/components/navbar/Navbar";
import Spinning from "@/components/spinning";



interface IPrams{
  category: string;
}
const Category =async ({params}:{params:IPrams}) => {
  

  const courses=await getCourses();
  const selectedCourses=courses?.filter((course)=>course.category===params.category);
  if(!courses){
    return <div className="w-full h-screen flex justify-center items-center">
      <Spinning/>
    </div>
  }
  return (<><Navbar/> <div className="flex pb-20">
<div className="flex flex-col gap-10 w-full items-center">


<div className="flex 
 bg-teal-500
 dark:bg-gray-800
  w-[90%]
   m-10
    h-72 
    flex
     justify-center 
     items-center">
      <h1 className="text-3xl md:5xl font-bold text-white ">{params.category} Courses</h1>
    </div>


   

    <h1 className='w-full text-xl md:text-4xl font-semibold border-b-2 border-double p-2 dark:text-gray-300 border-gray-200 dark:border-gray-700 pl-4'>New Coming {params.category}   Courses</h1>
    <div className='flex justify-center flex-wrap gap-8 md:px-10 '>

{selectedCourses?.map((course,index)=>{
  return <Card
  key={index}
      id={course.id}
      category={course.category}
      price={course.price}
      subject={course.subject}
      rating={course.rating??0}
      cover={course.cover}  />

})}


</div>

</div>
  </div> </> );
}
 
export default Category;