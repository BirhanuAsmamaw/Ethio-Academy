"use client"

import Button from "@/components/button/button";
import Input from "@/components/input/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCart } from "@/hooks/use.cart";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface FormProps{
  admins:any[];
  user:any;
  banks:any[] | null;
}

const PaymentForm:React.FC<FormProps> = ({admins,user,banks}) => {
  const router=useRouter();
  const {carts,department,removeAllFromCart}=useCart();
  const [selectedBank, setSelectedBank] = useState('');
  const [Loading,setIsLoading]=useState(false);
 

const courses=carts?.map((course)=>{
  return{
    id:course.id,
    subject:course.subject,
    price:course.price,}
})

  const {register,handleSubmit,formState:{errors}}=useForm<FieldValues>({
    defaultValues: {
      departmentId:null,
    
     bank:selectedBank,
     courses:courses,
     transaction:'',
     totalPrice:0,}})

   






useEffect(()=>{
 router.prefetch('/mycourses');
},[router])




 


  const onSubmit:SubmitHandler<FieldValues>=async(data)=>{
    setIsLoading(true)
   
    const notificationData = {
      url:`/dashboard/approved-courses`,
      type:'Success',
      title: `🌟 Payment Success!`,
      message: `🎉 ${user.name} 
      has successfully purchased 
      ${courses?.length?`${courses? courses.length:0} exciting courses.`:''},
      ${department?`${department?.departmentName} exciting Exam.`:''}
      `,
      customers:admins
  };
  
const departmentData={
  id:department?.id,
  
  
}
  const payment={...data, bank:selectedBank,
    courses:courses,departmentId:department?departmentData.id:null}
   console.log("Payments data",payment);
    axios.post('/api/payment',payment).then(()=>{
      toast.success("Thank you! Paid successfully")
      axios.post('/api/notification',notificationData);
    router.push('/mycourses')
    })
    .catch((error)=>{
      toast.error(error.message)
    
    }).finally(()=>{
      setIsLoading(false)
    });
    removeAllFromCart()
    

    
  

    

  }



















  return ( <div className="py-10">
  

<form className="max-w-md mx-auto">






  <div className="relative z-0 w-full mb-5 group">


  <Select
           onValueChange={
            (value)=>setSelectedBank(value)
          }>
      <SelectTrigger  className="w-[180px] bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded-[10px]">
        <SelectValue  placeholder="Select Exam Type" />
      </SelectTrigger>
      <SelectContent className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded-[10px]">
        <SelectGroup>
          <SelectLabel>Select the Bank you Payed</SelectLabel>
         {banks?.map((bank,index) =>{
         return  <SelectItem className="w-full hover:bg-gray-200  hover:dark:bg-gray-600" key={index} value={bank.bankName}>{bank.bankName}</SelectItem >
         })}
          
        </SelectGroup>
      </SelectContent>
    </Select>



  </div>
  
  
  <div className="grid md:grid-cols-2 md:gap-6">

    <div className="relative z-0 w-full mb-5 group">
  <Input register={register} errors={errors} label="Price" type="number" id="totalPrice" required/>
    </div>

    <div className="relative z-0 w-full mb-5 group">
          <Input register={register} errors={errors} label="Bank Transaction Id" type="text"  id="transaction" required/>
    </div>
  </div>

  <Button onClick={handleSubmit(onSubmit)} isDisabled={Loading} title={Loading? "Loading...":"Submit"}/>
</form>

  </div> );
}
 
export default PaymentForm;