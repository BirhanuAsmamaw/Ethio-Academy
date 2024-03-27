
"use client"
import Button from "@/components/button/button";
import Input from "@/components/input/input";
import axios from "axios";
import { useRouter } from "next/navigation";
import {  useState } from "react";
import { useForm, FieldValues, SubmitHandler} from "react-hook-form";
import toast from "react-hot-toast";
import {signIn} from 'next-auth/react'
import { RemoveFile } from "@/actions/file/removeFile";
import AvatarUploader from "@/components/input/avatarInput";

interface EditAccountProps{
  user:any;
}
const EditAccount:React.FC<EditAccountProps> = ({user}) => {
  const [isLoading,setloading] =useState(false);
  const router=useRouter();
  const [imageUrl, setImageUrl] = useState(user?.image? user?.image:"");
  const [imageKey, setImageKey] = useState(user?.image_key? user?.image_key:"");


  const {register,handleSubmit,formState:{errors}}=useForm<FieldValues>({
  
    defaultValues:{
      name:user.name,
      email:user.email,
   


        
    }})




  async function handleCoverChange() {
    try {
      if(user.image&&user.image_key){
        const data = await RemoveFile(user.image_key);
      if (data.success) {
        toast.success(data.message);
        setImageUrl("");
        setImageKey("");
      } else {
        toast.error(data.message);
      }
      }
    } catch (error) {
      
      toast.error("An error occurred while removing the file.");
    }
  }



   const onuserCoverComplete=(res:any[]) => {
    const url = res[0]?.url || "";
    const key=res[0]?.key || "";
    setImageUrl(url);
    setImageKey(key);
    const imageData={
      image_key:key,
      image:url
    }


   axios.put(`/api/user/updatePhoto`,{image:imageData.image,image_key:imageData.image_key}).then(()=>{
    setImageUrl(user?.image?user?.image:"");
    setImageKey(user?.image_key?user?.image_key:"");
    toast.success("Your Image Updated  successfully")
    }).catch((error)=>{
      toast.error(error.message);
    });
   
  }


    const onSubmit:SubmitHandler<FieldValues> =async (data) => {
      setloading(true);
     
      axios.put('/api/user/updateprofile', {...data}).then(() => {
        toast.success("Your profile has been updated successfully")
      
        signIn('credentials',{
          email: data.email,
         
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

   
    
  return ( <div className="p-2 flex flex-col gap-4 w-full">
  <h1 className="text-lg font-semibold">Edit Your Account</h1>
  <div className="p-2 space-y-3">
  <AvatarUploader
      onClientUploadComplete={onuserCoverComplete}
      label="Upload Your Photo"
        file={imageUrl?imageUrl:user.image}
        handleMediaChange={handleCoverChange}
        endpoint="imageUploader"
       
      />

    <Input defaultValue={user.name} type="text" label="Edit Your Name" register={register} errors={errors} id="name"/>
    <Input defaultValue={user.email} type="email" label="Edit Your Email" register={register} errors={errors} id="email"/>
    <div className="p-6 flex justify-end">
      <Button isDisabled={isLoading} title={isLoading? "Loading...":"Submit"} onClick={handleSubmit(onSubmit)}/>
    </div>
  </div>
</div> );
}
 
export default EditAccount;