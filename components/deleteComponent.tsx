import Button from "./button/button";

interface DeleteComponentProps{
  isLoading?: boolean;
  onDelete:()=>void;
  title:string;
  label:string;
}
const DeleteComponent:React.FC<DeleteComponentProps> = ({isLoading,onDelete,label,title}) => {
  return ( <div className="h-screen w-full flex justify-center items-center">
  <div className="mx-4 w-full md:max-w-md py-4 px-2 border bg-white border-gray-200 rounded-[10px] space-y-4 dark:bg-gray-800 dark:border-gray-700 ">
    <h5 className="text-[20px] font-normal text-rose-400 ">Are Sure To {title}?</h5>
    <Button 
isDisabled={isLoading}
title={isLoading? "Loading...":`${label}`}
className="transition duration-300  text-center " 
onClick={onDelete}/>
  </div>
</div> );
}
 
export default DeleteComponent;