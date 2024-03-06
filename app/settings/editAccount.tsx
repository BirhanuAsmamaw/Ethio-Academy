
"use client"
import Button from "@/components/button/button";
import AvatarInput from "@/components/input/avatarInput";
import Input from "@/components/input/input";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { useForm, FieldValues, SubmitHandler} from "react-hook-form";
import toast from "react-hot-toast";
import {signIn} from 'next-auth/react'
interface EditAccountProps{
  user:any;
}
const EditAccount:React.FC<EditAccountProps> = ({user}) => {
  const [isLoading,setloading] =useState(false);
  const [image,setImage]=useState<File|null>(null)
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const router=useRouter();
  const {register,handleSubmit,formState:{errors}}=useForm<FieldValues>({
  
    defaultValues:{
      image:user?.image||null,
      name:user.name,
      email:user.email

        
    }})



    const handleImageChange = useCallback((acceptedFiles:any)=> {
      setImage(acceptedFiles[0])
      setSelectedImage(URL.createObjectURL(acceptedFiles[0]));
    }, [])


    
    const onSubmit:SubmitHandler<FieldValues> = (data) => {
      setloading(true);
      axios.put('/api/user/updateprofile', data).then(() => {
        toast.success("Your profile has been updated successfully")
      
        signIn('credentials',{
          email: data.email,
          password: user.hash,
          redirect:false,
         }).then((callback)=>{
           if (callback?.ok){
            router.push("/mycourses")
            router.refresh();
             
             toast.success("account logged in successfully")
             
           }
           if (callback?.error){
             toast.error(callback.error)
           }
         })  
      }).catch((error)=>{
        toast.error(error.message)
      }).finally(() => {
        setloading(false);
      });
     
      
    }

    

    const onCancelImage = () => {
      setSelectedImage(null);
    };
    
  return ( <div className="p-2 flex flex-col gap-4 w-full">
  <h1 className="text-lg font-semibold">Edit Your Account</h1>
  <div className="p-2 space-y-3">
    <div className="p-2 flex justify-center items-center w-full">
      <AvatarInput 
      register={register} 
      errors={errors} 
      id="image"
      onCancel={onCancelImage}
      
      file={selectedImage}
      onDrop={handleImageChange}/>
    </div>
    <Input defaultValue={user.name} type="text" label="Edit Your Name" register={register} errors={errors} id="name"/>
    <Input defaultValue={user.email} type="email" label="Edit Your Email" register={register} errors={errors} id="email"/>
    <div className="p-6 flex justify-end">
      <Button isDisabled={isLoading} title={isLoading? "Loading...":"Submit"} onClick={handleSubmit(onSubmit)}/>
    </div>
  </div>
</div> );
}
 
export default EditAccount;