"use client"


import Spinning from "@/components/spinning";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EditAccount from "./editAccount";
import EditPassword from "./editPassword";
import EditAvatar from "./editAvatar";
import UserProfileContainer from "@/app/user/[userId]/userProfileContainer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import SocialLink from "@/app/user/[userId]/socialLink";
import { socialData } from "@/lib/socialData";
import { isError } from "util";
import EditName from "./editName";
import EditYourDepartment from "./editYourDepartment";
import EditYourDescription from "./editYourDescription";
import EnrolledCourses from "./enrolledCourses";
import TeachingCourses from "./teachingCourses";



interface ProfileClientProps{
  user:any;
}

const ProfileClient:React.FC<ProfileClientProps> = ({user}) => {



  if(!user){
    return <div className="w-full  flex justify-center items-center">
      <Spinning/>
    </div>
  }

  const courses = user.payedCourses.flatMap((payedCourse: any) =>payedCourse.courses.flatMap((c:any)=>c.course)
);

  const names=user?.name.split(" ")


  return ( <div className="flex w-full justify-center">
  <div className='sm:p-4 w-full lg:w-11/12 justify-center gap-x-4 py-10 grid grid-cols-1 lg:grid-cols-12'>
    <div className="flex p-2 justify-end w-full lg:col-span-4">
      {user? (
        <UserProfileContainer>
          <div className="flex text-center items-center w-full justify-start gap-x-2">
          <Avatar className="h-20 w-20">
                  <AvatarImage src={user?.image || "/"} alt="User Image" />
                  <AvatarFallback>
                    {names[0]?.[0]}{names[1]?.[0]}
                  </AvatarFallback>
                </Avatar>
            <h2 className='text-[20px] flex gap-2 items-center text-center sm:text-lg truncate lg:text-xl xl:text-2xl font-medium tracking-tight leading-tight p-2'>
            <span> {user?.name}</span>
            <EditName user={user}/>
            </h2>
          </div>
          {/* <div className="p-2">
            <p className='lg:text-lg font-medium leading-10 border-b-2 border-slate-200 dark:border-gray-600'>Contact Me</p>
            <div>
              {socialData.map((social, index) => (
                <SocialLink key={index} url={social.url} icon={social.icon} name={social.name} />
              ))}
            </div>
          </div> */}
          <div className="p-2">
            <p className='lg:text-lg font-medium leading-10 border-b-2 border-slate-200 dark:border-gray-600'>
              Enrolled Courses: <span>{courses.length}</span>
            </p>
            <div>
              {/* <p className='text-[14px]'>Completed: <span>20</span></p> */}
              <p className='text-[14px]'>Ongoing: <span>{courses.length}</span></p>
            </div>
          </div>
          {/* <div className="p-2">
            <div className='lg:text-lg gap-2 flex font-medium leading-10 border-b-2 border-slate-200 dark:border-gray-600'>
              Exams Taken: <span>1</span>
            </div>
          </div> */}
          {user?.teacher?<div className="p-2">
            <div className='lg:text-lg gap-2 flex font-medium leading-10 border-b-2 border-slate-200 dark:border-gray-600'>
              My Teaching Courses: <span>{user?.teacher?.courses?.length}</span>
            </div>
          </div>:""}
        </UserProfileContainer>
      ) : null}
    </div>

    <div className="flex p-2 justify-end w-full lg:col-span-8">
      {user ? (
        <UserProfileContainer className='space-y-6'>
          <EditYourDepartment user={user}/>
          {/* About me */}
          <EditYourDescription user={user}/>

            {/* Enrolled Courses */}
           <EnrolledCourses user={user}/>



            {/* Exams Taken */}
            {/* <div className="p-2 sm:p-4  space-y-2">
            <h3 className='text-xl font-medium leading-10 border-b-2 border-slate-200 dark:border-gray-600'> Exams Taken</h3>
            <p >Software Engineering Exit Exams</p>
            
          </div> */}


            {/* My Teaching Courses*/}
            <TeachingCourses user={user}/>
        </UserProfileContainer>
      ) : null}
    </div>
  </div>
</div>);
}
 
export default ProfileClient;



{/* <UserProfileContainer>

<div className="">


  <EditAvatar user={user}/>



</div>








    <Tabs defaultValue="account" className=" w-full ">
  <TabsList className=" flex flex-wrap w-full gap-4 p-2 ">
    <TabsTrigger className="
           border-b-[1.5px]  
           font-normal
            border-slate-400 
           bg-transparent 
           shadow-none
           hover:dark:text-white
           hover:text-gray-900
           hover:font-medium
           hover:dark:border-gray-100
            transition
              duration-300
           hover:border-gray-800
           data-[state=active]:border-blue-500
           data-[state=active]:dark:border-green-400
           data-[state=active]:border-b-2
           data-[state=active]:font-medium
           data-[state=active]:text-blue-500
           data-[state=active]:dark:text-green-400

           " value="account">Account</TabsTrigger>
    <TabsTrigger className="
           border-b-[1.5px]  
           font-normal
            border-slate-400 
           bg-transparent 
           shadow-none
           hover:dark:text-white
           hover:text-gray-900
           hover:font-medium
           hover:dark:border-gray-100
            transition
              duration-300
           hover:border-gray-800
           data-[state=active]:border-blue-500
           data-[state=active]:dark:border-green-400
           data-[state=active]:border-b-2
           data-[state=active]:font-medium
           data-[state=active]:text-blue-500
           data-[state=active]:dark:text-green-400

           "  value="password">Password</TabsTrigger>
   
  </TabsList>

  <TabsContent value="account" className="flex justify-center mt-6">
  <EditAccount user={user}/>
  </TabsContent>



  <TabsContent value="password" className="flex justify-center mt-6">
  <EditPassword user={user}/>
  </TabsContent>





</Tabs> 
  </UserProfileContainer> */}