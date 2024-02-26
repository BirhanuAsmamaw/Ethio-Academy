"use client"
import axios from "axios";
import CDropDown from "./CustomeDropdown/CDropDown";
import { IoMdNotificationsOutline } from "react-icons/io";
import { useRouter } from "next/navigation";

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
    notifications.forEach(notification =>axios.put(`/api/notification/${notification.id}/delete`));
    router.refresh();
  };

  const onClearOne=(notificationId:string) => {
   axios.put(`/api/notification/${notificationId}/delete`);
    router.refresh();
  };
  return (  <CDropDown large title={
    <div onClick={onRead}>
<IoMdNotificationsOutline size={24} />
<div className={`absolute top-0 right-0   h-4 w-4 flex justify-center items-center rounded-full text-black bg-green-500 ${unreadNotifications?.length? 'block':'hidden'}`}><p className="text-[10px]">{unreadNotifications?.length?`${unreadNotifications?.length}`:''}</p></div>
    </div>
    
    
  } body={<div>

    {notifications?.length?<div>
      {notifications?.map((notification)=>{
        return <div key={notification.id} id="alert-additional-content-3" className="p-4 max-h-[800px] overflow-y-auto mb-4 text-green-800 border border-green-300 rounded-[5px] bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800" role="alert">
        <div className="flex items-center">
          
          <h3 className="text-base font-medium">{notification.title}</h3>
        </div>
        <div className="mt-2 mb-4 text-xs">
         {notification.message}
        </div>
        <div className="flex">
          <button type="button" className="text-white bg-green-800 hover:bg-green-900 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-[5px] text-xs px-2 py-1 me-2 text-center inline-flex items-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
            <svg className="me-2 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 14">
              <path d="M10 0C4.612 0 0 5.336 0 7c0 1.742 3.546 7 10 7 6.454 0 10-5.258 10-7 0-1.664-4.612-7-10-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z"/>
            </svg>
            View more
          </button>
          <button onClick={()=>onClearOne(notification.id)} type="button" className="text-green-800 bg-transparent border border-green-800 hover:bg-green-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-[10px] text-xs px-2 py-1 text-center dark:hover:bg-green-600 dark:border-green-600 dark:text-green-400 dark:hover:text-white dark:focus:ring-green-800" data-dismiss-target="#alert-additional-content-3" aria-label="Close">
            Clear
          </button>
        </div>
      </div>
      })}
      </div>:

// no notification
      <div className="py-4 flex justify-center">
       <p className="text-md text-gray-5000 dark:text-gray-400">No Notification</p>
      </div>



      }

      <div className="flex flex-end w-full">
        <button onClick={onClearAll} className="border border-red-300  hover:border-red-400  bg-opacity-40 hover:bg-opacity-60 rounded-[10px] bg-red-600 text-sm text-red-600 dark:text-red-400">Clear All</button>
      </div>
  </div>}/> );
}
 
export default NotificationDropDown;