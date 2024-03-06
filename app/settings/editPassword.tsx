
"use client"
import Input from "@/components/input/input";
import { useForm, FieldValues } from "react-hook-form";
interface EditPasswordProps{
  user:any;
}
const EditPassword:React.FC<EditPasswordProps> = ({user}) => {

  const {register,setValue,handleSubmit,getValues,formState:{errors}}=useForm<FieldValues>({
  
    defaultValues:{
      
      oldPassword:"",
      newPassword:""

        
    }})


  return ( <div className="p-1 flex flex-col gap-4 w-full">
  <h1 className="text-lg font-semibold">Edit Your Password</h1>
  <div className="p-2 space-y-3">
    <Input type="password" label="Old Password" register={register} errors={errors} id="oldPassword"/>
    <Input type="password" label="New password" register={register} errors={errors} id="newPassword"/>
  </div>
</div> );
}
 
export default EditPassword;