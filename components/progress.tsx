
interface CustomeProgressProps{
  progress:number;
  title:string;
}

const CustomeProgress:React.FC<CustomeProgressProps> = ({progress,title}) => {
  return ( <div className="p-4 w-full"><div className="flex justify-between mb-1">
  <span className="text-base font-medium text-blue-700 dark:text-white">{title}...</span>
  <span className="text-sm font-medium text-blue-700 dark:text-white">{progress}%</span>
</div>
<div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
</div></div> );
}
 
export default CustomeProgress;