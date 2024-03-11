"use client"
import { useCart } from "@/hooks/use.cart";


const PaymentCourse = () => {

  const {carts,totalPrice,department}=useCart();

  return (<>
   <div className=" max-w-lg flex flex-col gap-2 border-y-2  rounded-[10px] border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">

   
<div className="flex flex-col gap-4 p-2">
{department?<p className="text-gray-500 dark:text-gray-400 font-medium py-2">
  <span>Buy All </span>
  <span className="text-black dark:text-white font-semibold bold "> {department.exam.examType}</span>
  <span> Exams By </span>
  <span className="font-semibold text-rose-600 dark:text-green-400">{department.price} ETB</span>
  <span> Only!!!</span>



</p>:""}


  {carts?.length?<div className=" flex justify-between">
  <div className="">

  <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">Courses:</h2>
  <ul className="max-w-md text-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
{carts?.map((cart:any,index) => {
  return <li key={index}>
  {cart.subject}
</li>
})}
   
</ul>



  </div>
  <p className="text-xl font-bold text-rose-600 dark:text-green-400">{totalPrice} ETB</p>
  </div>:""}

  <div className="p-2">

<h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">To Buy These {carts?.length?'Courses':''},{department?`${department.exam.examType} Exams`:''}:</h2>
<ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
<li>
        Make payment to any account listed above.
    </li>
    <li>
        After making the payment, please fill out the following forms, and the admins will approved you.
    </li>
    <li>
        For any confusion or problems, please call +251930793119.
    </li>
</ul>



  </div>
  

</div>
  

  </div> </>);}

 
export default PaymentCourse;