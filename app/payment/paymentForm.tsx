"use client"

import Heading from "@/components/Heading/Heading";
import Button from "@/components/button/button";
import FileInput from "@/components/input/fileInput";
import Input from "@/components/input/input";
import { useCart } from "@/hooks/use.cart";
import { bank_accounts } from "@/lib/bank_account";
import firebaseApp from "@/lib/firebasedb";
import axios from "axios";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import image from "next/image";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface FormProps{
  admins:any[];
  user:any;
}
const PaymentForm:React.FC<FormProps> = ({admins,user}) => {
  const {carts,totalPrice}=useCart();
  const [selectedBank, setSelectedBank] = useState('');
  const [receipt,setReceipt]=useState<File|null>(null);
  const [selectedReceipt,setSelectedReceipt]=useState<any>(null);
  const [Loading,setIsLoading]=useState(false);
  const handleSelectChange = (e:any) => {
    setSelectedBank(e.target.value);
  };


const courses=carts?.map((course)=>{
  return{subject:course.subject,
    price:course.price,}
})

  const {register,setValue,handleSubmit,getValues,formState:{errors}}=useForm<FieldValues>({
    defaultValues: {
     recit:null,
     bank:selectedBank,
     courses:courses,
     transaction:'',
     totalPrice:0,}})


      const handlePaymentReceipt = useCallback((acceptedFiles:any)=> {
        // Do something with the files
        setReceipt(acceptedFiles[0])
        setSelectedReceipt(URL.createObjectURL(acceptedFiles[0]));
        // setValue('cover','cover')
      }, []) 












 let receiptUrl:string="";
 


  const onSubmit:SubmitHandler<FieldValues>=async(data)=>{
    setIsLoading(true)
    const handleImageUpload = async() =>{
      try{
        const storage=getStorage(firebaseApp);

      if(receipt){
        const fileName=new Date().getTime()+"-"+receipt.name;

        const imageStorageRef=ref(storage,`payment/receipt/${fileName}`);
        const uploadTask=uploadBytesResumable(imageStorageRef,receipt);
        await new Promise<void>((resolve,reject)=>{
          uploadTask.on('state_changed',
          (snapshot)=>{
            const progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100
            switch(snapshot.state){
                 case "paused":
                 
                   break;
                 case "running":
                  
                   break;
            }
          },
          (error)=>{
           
            reject(error);
          },
          ()=>{
            //succesful upload receipt
            getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl)=>{
              receiptUrl=downloadUrl
             
              resolve();
            }).catch((error)=>{
              
              reject(error);
            });
          }

          )

        })

      }

      
    
    } catch(error) {

    }

    
    


  }
  await handleImageUpload();
  
  if(!receiptUrl ||!data.courses.length || !data.transaction || !data.bank|| !data.totalPrice ) {  
 toast.error("payment data is not valid!!")
  }
  if(data.totalPrice!=totalPrice){

    toast.error("The Price not much The course price ")
  }
  const notificationData = {
    title: `🌟 Payment Success!`,
    message: `🎉 ${user.name} has successfully purchased ${courses? courses.length:'no'} exciting courses.`,
    customers:admins
};
  const payment={...data,recit:receiptUrl}
    axios.post('/api/payment',payment).then(()=>{
      axios.post('/api/notification',notificationData);
      toast.success("Thank you! Paid successfully")
    })
    .catch((error)=>{
      toast.error(error.message)
    
    }).finally(()=>{
      setIsLoading(false)
    });

   
    
  

    

  }



























      //on cancel file
const onCancelReceipt = () => {
  setSelectedReceipt(null);
};

  return ( <div className="">
  

<form className="max-w-md mx-auto">


<div className="relative z-0 w-full mb-5 group">
          <Heading small title="Upload Course Receipt"/>
            <FileInput
            required
            onCancel={onCancelReceipt}
            file={selectedReceipt}
            fileType="Receipt"
          onDrop={handlePaymentReceipt}
              register={register}
              id="recit" 
              errors={errors}          
          />
        </div>



  <div className="relative z-0 w-full mb-5 group">

  <label htmlFor="underline_select" className="sr-only">Underline select</label>
<select  onChange={handleSelectChange}  id="underline_select" className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer">
    <option selected>Choose a banks</option>
    
    {bank_accounts.map((bank,index)=>{
      return  <option key={index} value={bank.bank_name}>{bank.bank_name}</option>
    })}
</select>

  </div>
  
  
  <div className="grid md:grid-cols-2 md:gap-6">

    <div className="relative z-0 w-full mb-5 group">
  <Input register={register} errors={errors} label="Price" type="number" id="totalPrice" required/>
    </div>

    <div className="relative z-0 w-full mb-5 group">
          <Input register={register} errors={errors} label="Price" type="number" id="transaction" required/>
    </div>
  </div>
  
  <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
  <Button onClick={handleSubmit(onSubmit)} isDisabled={Loading} title={Loading? "Loading...":"Submit"}/>
</form>

  </div> );
}
 
export default PaymentForm;