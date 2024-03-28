import { PiExam } from "react-icons/pi";
import { SiCoursera } from "react-icons/si";
import { PiUsersFourLight } from "react-icons/pi";

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
        url:"/dashboard/list-courses"
      },
      {
        label:"Create Course",
        url:"/dashboard/create-course"
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
        label:"Exam Type List",
        url:"/dashboard/exams/type"
      },
      {
        label:"Department List",
        url:"/dashboard/department"
      },
      {
        label:"Create Exam Question",
        url:"/dashboard/exams/create-exams"
      }
      
    ]
  }
]