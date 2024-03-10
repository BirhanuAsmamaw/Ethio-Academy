"use client"
interface ChooseFormProps{
  onChange:(event:any)=>void;
  label:string;
  onAnswer:(event:any)=>void;
}
const ChooseForm:React.FC<ChooseFormProps> = ({onChange,label,onAnswer}) => {

  return ( 
    <div className="flex gap-2 w-full">
    <label htmlFor="first_name" className=" mt-2 font-medium  text-lg text-gray-700 dark:text-white">{label}</label>
   
      <textarea 
      onChange={onChange}
      className="block 
  p-2.5 w-full 
  text-sm 
  text-gray-900 
  bg-gray-50 
  
  rounded-[10px]
  border 
  border-gray-300
   focus:ring-blue-500 
   focus:border-blue-500 
   dark:bg-gray-700 
   dark:border-gray-600 
   dark:placeholder-gray-400 
   dark:text-white 
   dark:focus:ring-blue-500 
  dark:focus:border-blue-500
  " ></textarea>
    <div className="flex items-center gap-1 ">
      <input value={'true'} onChange={onAnswer} id="default-radio-1" type="radio"  name="default-radio" className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
      <label htmlFor="default-radio-1" className=" text-xs font-medium text-gray-900 dark:text-gray-300">IsAnswer</label>
  </div>
    </div> );
}
 
export default ChooseForm;