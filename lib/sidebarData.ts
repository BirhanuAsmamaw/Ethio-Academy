import { PiExam } from "react-icons/pi";
import { SiCoursera } from "react-icons/si";
import { PiUsersFourLight } from "react-icons/pi";
import { PiBankLight } from "react-icons/pi";
import { GiHeron } from "react-icons/gi";

import { FaUniversity } from "react-icons/fa";
export const sidebarData=[
  // {
  //   title:"Dashboard",
  //   url:"/dashboard",
  //   icon:MdOutlineDashboard,

  // },
  {
    title:"Course",
    icon:SiCoursera,
    items:[
      {
        label:"Course List",
        url:"/dashboard/course"
      },
      {
        label:"Create Course",
        url:"/dashboard/course/add-course"
      }, {
        label:"Approved Course",
        url:"/dashboard/approved-courses"
      }

    ]
  },
  {
    title:"User",
    icon:PiUsersFourLight,
    items:[
      {
        label:"User List",
        url:"/dashboard/user-list"
      },
      {
        label:"Teacher List",
        url:"/dashboard/user-list/teachers"
      }
    ]
  },

  {
    title:"Exams",
    icon:PiExam,
    items:[
      {
        label:"Create Exam Category",
        url:"/dashboard/exams"
      },
      {
        label:"Create Exam Question",
        url:"/dashboard/exams/create-question"
      },
      {
        label:"Exam Type List",
        url:"/dashboard/exams/type"
      },
      {
        label:"Department List",
        url:"/dashboard/department"
      },
      
      
    ]
  },{
    title:"Bank",
    icon:PiBankLight,
    items:[
      {
        label:"Create Bank",
        url:"/dashboard/bank/create"
      },
      {
        label:"Bank List",
        url:"/dashboard/bank/list"
      },
      
      
    ]
  },
  {
    title:"University",
    icon:FaUniversity,
    items:[
      {
        label:"Create University",
        url:"/dashboard/university/create"
      },
      {
        label:"University List",
        url:"/dashboard/university/list"
      },
      
      
    ]
  },

  {
    title:"Banner",
    icon:GiHeron,
    items:[
      {
        label:"Banner",
        url:"/dashboard/banner"
      },
      
      
      
    ]
  },
  

  

  

]