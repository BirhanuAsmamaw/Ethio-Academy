
import {FieldErrors, FieldValues, UseFormRegister} from 'react-hook-form'

interface InputProps{
  type:string;
  label:string;
  disabled?:boolean;
  required?:boolean;
  placehoder?:string;
  register:UseFormRegister<FieldValues>;
  errors:FieldErrors;
  id:string;
  userFrom?:boolean;
  defaultValue?:string;

}

const Input:React.FC<InputProps> = ({defaultValue,userFrom,type,label,disabled,required,id,register,placehoder,errors}) => {

  const labelClass=`
  flex w-full h-full 
  select-none 
  pointer-events-none absolute left-0 
  font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 
  transition-all -top-1.5 
  peer-placeholder-shown:text-sm 
  text-[11px] peer-focus:text-[11px]
   before:content[' ']
    before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px]
     before:mr-1 peer-placeholder-shown:before:border-transparent 
     before:rounded-tl-md before:border-t peer-focus:before:border-t-2 
     before:border-l peer-focus:before:border-l-2 
     before:pointer-events-none before:transition-all 
     peer-disabled:before:border-transparent 
     after:content[' '] 
     after:block after:flex-grow 
     after:box-border after:w-2.5 
     after:h-1.5 after:mt-[6.5px] 
     after:ml-1 peer-placeholder-shown:after:border-transparent 
     after:rounded-tr-md after:border-t 
     peer-focus:after:border-t-2 
     after:border-r peer-focus:after:border-r-2 
     after:pointer-events-none after:transition-all 
     peer-disabled:after:border-transparent 
     peer-placeholder-shown:leading-[3.75]
      text-gray-600
      dark:text-gray-400
       peer-focus:text-gray-900 
       peer-focus:dark:text-gray-200 
      before:border-blue-gray-200
       peer-focus:before:!border-gray-900 
       after:border-blue-gray-200 
       peer-focus:after:!border-gray-900`

const inputClass=`
peer
     w-full h-full 
     bg-transparent
      text-blue-gray-700
       font-sans font-normal
        outline 
        outline-0 
        focus:outline-0 
        disabled:bg-blue-gray-50 
        disabled:border-0 
        transition-all 
        placeholder-shown:border
         placeholder-shown:border-blue-gray-500 
         placeholder-shown:dark:border-blue-gray-600 
       
         border 
         dark:border-gray-600
         focus:border-2 
          text-base
          px-3 py-2.5 rounded-[7px] 
          border-blue-gray-400
           focus:border-blue-600
`


  return (  <div className={`${userFrom? 'relative w-full min-w-[200px] h-10':''}`}>
    <label htmlFor="first_name" className={`
    
    ${userFrom? labelClass:`block mb-2 text-sm font-medium `}
    ${errors[id]? 'text-rose-600':' '}
    
    `}>{label}</label>
    <input type={type}
    
    defaultValue={defaultValue}
    disabled={disabled}
    
     id={id}
     {...register(id,{required})}
     required={required}
     placeholder={placehoder}
     
    className={`
    
    ${userFrom? inputClass:`
   
    text-gray-900 
    text-sm 
    
     focus:ring-blue-500 
     
      p-2.5 
      
      
      dark:border-gray-600 
      dark:placeholder-gray-400
       dark:text-white 
       dark:focus:ring-blue-500 
       dark:focus:border-blue-500  bg-transparent  appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5`}
    ${errors[id]? 'border-rose-400 dark:border-rose-600':''}
    `} 
  
    />
</div> );
}
 
export default Input;