"use client"

import { useCart } from "@/hooks/use.cart";
import { Oleo_Script } from "next/font/google";
import { useRouter } from "next/navigation";
const Oscript=Oleo_Script({style:["normal"],subsets:["latin"],weight:["400"]} )
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
    <div className="w-full md:px-4  gap-x-1 md:gap-x-4 flex justify-end ">
      <h5 className={`text-xl lg:text-2xl text-green-300  drop-shadow-md font-bold ${Oscript.className}`}><span className=" font-medium text-yellow-300">100 ETB</span> <span>Only!</span></h5>
      <button onClick={onPayment} className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden rounded-full font-bold text-gray-900  group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
<span className="relative px-2 py-1 lg:px-5 lg:py-2.5  w-full transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-full group-hover:bg-opacity-0">
Buy Exams Now!
</span>
</button>

    </div>
     
  </div>);
}
 
export default BuyExamButton;