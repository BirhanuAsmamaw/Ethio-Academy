"use client"
import axios from "axios";
import { IoMdNotificationsOutline } from "react-icons/io";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuTrigger } from "../ui/dropdown-menu";


  interface NotificationDropDownProps{
    notifications:any[];

 
  } 
const NotificationDropDown:React.FC<NotificationDropDownProps> = ({notifications}) => {
const router=useRouter();
  const unreadNotifications=notifications.filter(notification =>!notification.isRead)

  const onRead=() => {
    notifications.forEach(notification =>axios.put(`/api/notification/${notification.id}/editread`));
    router.refresh();
  };

  const onClearAll=() => {
    notifications.forEach(notification =>axios.delete(`/api/notification/${notification.id}/delete`));
    router.refresh();
    
  };

  const onClearOne=(notificationId:string) => {
   axios.delete(`/api/notification/${notificationId}/delete`);
    router.refresh();
  };

  
  return (  
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
        <Button variant="ghost"  onClick={onRead} >
    <IoMdNotificationsOutline size={24} />
    <div className={`absolute top-0 right-0   h-4 w-4 flex justify-center items-center rounded-full text-black bg-green-500 ${unreadNotifications?.length? 'block':'hidden'}`}><p className="text-[10px]">{unreadNotifications?.length?`${unreadNotifications?.length}`:''}</p></div>
        </Button>
         
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 mt-3">
          <DropdownMenuGroup>
    
          {notifications?.length?<div>
          {notifications?.map((notification)=>{
            return <div key={notification.id} id="alert-additional-content-3"
             className={`p-4  mb-4 border rounded-[5px]  dark:bg-gray-800 
             ${notification.type==="Success"&&`
             dark:text-green-400 
             dark:border-green-800
              text-green-800 
             border-green-300 
             ${!notification.isRead&&'bg-green-50'}
             `}
    
    
             ${notification.type==="Info"&&`
             dark:text-blue-400 
             dark:border-blue-800
              text-blue-800 
             border-blue-300 
             ${!notification.isRead&&'bg-blue-50'}
             `}
    
    
    
             ${notification.type==="Danger"&&`
             dark:text-red-400 
             dark:border-red-800
              text-red-800 
             border-red-300 
             ${!notification.isRead&&'bg-red-50'}
             `}
    
    
             ${notification.type==="Warning"&&`
             dark:text-yellow-400 
             dark:border-yellow-800
              text-yellow-800 
             border-yellow-300 
             ${!notification.isRead&&'bg-yellow-50'}
             `}
             
            `} role="alert">
            <div className="flex items-center">
              
              <h3 className="text-base font-medium">{notification.title}</h3>
            </div>
            <div className="mt-2 mb-4 text-xs">
             {notification.message}
            </div>
            <div className="flex">
              {notification.url&&<Link href={notification.url} 
              className={`
              text-white  focus:ring-4 focus:outline-none  font-medium rounded-[5px] text-xs px-2 py-1 me-2 text-center inline-flex items-center 
              ${notification.type==="Success"&&`
              dark:bg-green-600 
              dark:hover:bg-green-700
               dark:focus:ring-green-800
              bg-green-800 
              focus:ring-green-300
              hover:bg-green-900
              `}
    
              ${notification.type==="Danger"&&`
              dark:bg-red-600 
              dark:hover:bg-red-700
               dark:focus:ring-red-800
              bg-red-800 
              focus:ring-red-300
              hover:bg-red-900
              `}
    
              ${notification.type==="Info"&&`
              dark:bg-blue-600 
              dark:hover:bg-blue-700
               dark:focus:ring-blue-800
              bg-blue-800 
              focus:ring-blue-300
              hover:bg-blue-900
              `}
    
              ${notification.type==="Warning"&&`
              dark:bg-yellow-600 
              dark:hover:bg-yellow-700
               dark:focus:ring-yellow-800
              bg-yellow-800 
              focus:ring-yellow-300
              hover:bg-yellow-900
              `}
              
              `}>
    
                <svg className="me-2 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 14">
                  <path d="M10 0C4.612 0 0 5.336 0 7c0 1.742 3.546 7 10 7 6.454 0 10-5.258 10-7 0-1.664-4.612-7-10-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z"/>
                </svg>
                View more
              </Link>}
              <button onClick={()=>{onClearOne(notification.id)}} type="button" 
              className={`bg-transparent border  hover:text-white focus:ring-4 focus:outline-none font-medium rounded-[10px] text-xs px-2 py-1 text-center dark:hover:text-white 
    
              ${notification.type==="Success"&&`
              dark:focus:ring-green-800
              dark:hover:bg-green-600 
              dark:border-green-600 
              dark:text-green-400 
              focus:ring-green-300 
              border-green-800 
              hover:bg-green-900
              text-green-800
              `}
              ${notification.type==="Warning"&&`
              dark:focus:ring-yellow-800
              dark:hover:bg-yellow-600 
              dark:border-yellow-600 
              dark:text-yellow-400 
              focus:ring-yellow-300 
              border-yellow-800 
              hover:bg-yellow-900
              text-yellow-800
              `}
    
              ${notification.type==="Danger"&&`
              dark:focus:ring-red-800
              dark:hover:bg-red-600 
              dark:border-red-600 
              dark:text-red-400 
              focus:ring-red-300 
              border-red-800 
              hover:bg-red-900
              text-red-800
              `}
    
              ${notification.type==="Info"&&`
              dark:focus:ring-blue-800
              dark:hover:bg-blue-600 
              dark:border-blue-600 
              dark:text-blue-400 
              focus:ring-blue-300 
              border-blue-800 
              hover:bg-blue-900
              text-blue-800
              `}
             
              `} 
              data-dismiss-target="#alert-additional-content-3" aria-label="Close">
                Clear
              </button>
            </div>
          </div>
          })}
    
    <div className="flex justify-end w-full py-2 px-4">
          <button onClick={onClearAll} type="button" className="text-rose-800 bg-transparent border border-rose-800 hover:bg-rose-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-rose-300 font-medium rounded-[10px] text-xs px-2 py-1 text-center dark:hover:bg-rose-600 dark:border-rose-600 dark:text-rose-400 dark:hover:text-white dark:focus:ring-rose-800" data-dismiss-target="#alert-additional-content-3" aria-label="Close">
                Clear All
              </button>
             
          
          </div>
          </div>:
    
    // no notification
          <div className="py-4 flex justify-center hover:text-gray-600  font-semibold">
           <p className="text-md text-gray-5000 dark:text-gray-400">No Notification</p>
          </div>
    
    
    
          }
    
         
          </DropdownMenuGroup>
         
        
        
          
         
          
        </DropdownMenuContent>
      </DropdownMenu> );
}
 
export default NotificationDropDown;


