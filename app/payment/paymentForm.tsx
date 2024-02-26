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
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface FormProps{
  admins:any[];
  user:any;
}

const PaymentForm:React.FC<FormProps> = ({admins,user}) => {
  const {carts,totalPrice,removeAllFromCart}=useCart();
  const [selectedBank, setSelectedBank] = useState('');
  const [receipt,setReceipt]=useState<File|null>(null);
  const [selectedReceipt,setSelectedReceipt]=useState<any>(null);
  const [Loading,setIsLoading]=useState(false);
  const handleSelectChange = (e:any) => {
    setSelectedBank(e.target.value);
  };


const courses=carts?.map((course)=>{
  return{
    id:course.id,
    subject:course.subject,
    price:course.price,}
})

  const {register,handleSubmit,formState:{errors}}=useForm<FieldValues>({
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
  
 
  const notificationData = {
    title: `🌟 Payment Success!`,
    message: `🎉 ${user.name} has successfully purchased ${courses? courses.length:0} exciting courses.`,
    customers:admins
};

  const payment={...data,recit:receiptUrl, bank:selectedBank,
    courses:courses,}
   
    axios.post('/api/payment',payment).then(()=>{
      removeAllFromCart()
      toast.success("Thank you! Paid successfully")
    })
    .catch((error)=>{
      toast.error(error.message)
    
    }).finally(()=>{
      setIsLoading(false)
    });
    axios.post('/api/notification',notificationData);

   
    
  

    

  }



























      //on cancel file
const onCancelReceipt = () => {
  setSelectedReceipt(null);
};

  return ( <div className="">
  

<form className="max-w-md mx-auto">


<div className="relative z-0 w-full mb-5 group">
          <Heading small title="Upload Payment Receipt"/>
            <FileInput
            required
            onCancel={onCancelReceipt}
            file={selectedReceipt}
            fileType="image"
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
          <Input register={register} errors={errors} label="Bank Transaction Id" type="text"  id="transaction" required/>
    </div>
  </div>

  <Button onClick={handleSubmit(onSubmit)} isDisabled={Loading} title={Loading? "Loading...":"Submit"}/>
</form>

  </div> );
}
 
export default PaymentForm;