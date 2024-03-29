"use client"

import { useCart } from "@/hooks/use.cart";
import { useRouter } from "next/navigation";

interface BuyExamButtonProps{
  department: any;
 
}
const BuyExamButton:React.FC<BuyExamButtonProps> = ({department}) => {
  const router=useRouter();
const {addDepartment}=useCart();
  const onPayment=()=>{
    addDepartment({...department,price:100})
    router.push('/payment')
  }
  return ( <div>
    <div className="w-full px-4 py-6 flex justify-end ">
      <h5 className="text-xl lg:text-3xl text-green-600 dark:text-green-400  font-bold"><span className=" text-rose-400  font-extrabold dark:text-yellow-400">100 ETB</span> <span>Only!</span></h5>

    </div>
    <div className='flex flex-col md:flex-row justify-center w-full gap-6'>
  <button onClick={onPayment} className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden rounded-full font-bold text-gray-900  group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
<span className="relative px-3 py-2 lg:px-5 lg:py-2.5  w-full transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-full group-hover:bg-opacity-0">
Buy Exams Now!
</span>
</button>

  </div> 
  </div>);
}
 
export default BuyExamButton;