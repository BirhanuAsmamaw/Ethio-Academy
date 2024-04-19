import { FaUsers } from "react-icons/fa";
import { BsBook } from "react-icons/bs";
import { AiOutlineSchedule } from "react-icons/ai";
import { FiSettings } from "react-icons/fi";
import { SiCoursera } from "react-icons/si";

export const dashboardContents = [
  {
    url: "create-course",
    name: "Create Course",
    icon: SiCoursera,
  },
  {
    url: "manage-users",
    name: "Manage Users",
    icon: FaUsers,
  },
  {
    url: "course-library",
    name: "Course Library",
    icon: BsBook,
  },
  {
    url: "schedule-classes",
    name: "Schedule Classes",
    icon: AiOutlineSchedule,
  },
  {
    url: "platform-settings",
    name: "Platform Settings",
    icon: FiSettings,
  },
  // Add more items as needed
];




// const userData = [
//   {
//     id: "1",
//     userName: 'John',
//     permissions: [
//       {
//         id: "1",
//         permission: {
//           action: "CanAssignUserRole",
//         }
//       },
//       {
//         id: "2",
//         permission: {
//           action: "CanSeeUsersList"
//         }
//       }
//     ],
//     roles: [
//       {
//         id: "1",

//         role: {
//           id: "1",
//           name: "Admin",
//           permissions
//         }
//       }
//     ]
//   },
//   {
//     id: "2",
//     userName: 'Alice',
//     permissions: [
//       {
//         id: "1",
//         permission: {
//           action: "CanAssignUserRole",
//         }
//       },
     
//     ],
//     roles: [
//       {
//         id: "1",
//         role: {
//           id: "1",
//           name: "Admin",
//         }
//       }
//     ]
//   },
//   {
//     id: "3",
//     userName: 'Bob',
//     permissions: [
//       {
//         id: "1",
//         permission: {
//           action: "CanAssignUserRole",
//         }
//       },
//       {
//         id: "2",
//         permission: {
//           action: "CanSeeUsersList"
//         }
//       }
//     ],
//     roles: [
//       {
//         id: "1",
//         role: {
//           id: "1",
//           name: "Admin",
//         }
//       }
//     ]
//   },
//   // Add 3 more instances here
//   {
//     id: "4",
//     userName: 'Eve',
//     permissions: [
//       {
//         id: "1",
//         permission: {
//           action: "CanDeleteUser",
//         }
//       },
//       {
//         id: "2",
//         permission: {
//           action: "CanEditUserProfile"
//         }
//       }
//     ],
//     roles: [
//       {
//         id: "2",
//         role: {
//           id: "2",
//           name: "Moderator",
//         }
//       }
//     ]
//   },
//   {
//     id: "5",
//     userName: 'Charlie',
//     permissions: [
//       {
//         id: "1",
//         permission: {
//           action: "CanManageUsers",
//         }
//       },
//       {
//         id: "2",
//         permission: {
//           action: "CanManagePosts"
//         }
//       }
//     ],
//     roles: [
//       {
//         id: "3",
//         role: {
//           id: "3",
//           name: "Editor",
//         }
//       }
//     ]
//   },
//   {
//     id: "6",
//     userName: 'David',
//     permissions: [
//       {
//         id: "1",
//         permission: {
//           action: "CanViewReports",
//         }
//       },
//       {
//         id: "3",
//         permission: {
//           action: "CanManageUsers",
//         }
//       },
//       {
//         id: "2",
//         permission: {
//           action: "CanManageComments"
//         }
//       }
//     ],
//     roles: [
//       {
//         id: "4",
//         role: {
//           id: "4",
//           name: "Analyst",
//         }
//       }
//     ]
//   }
// ];



// const protectedData=(userId)=>{
// // see user list
// const isDataAccessed=userData[userId].permissions.some((permission)=>permission.permission.action === "CanSeeUsersList"||permission.permission.action === "CanManageUser")
// if(!isDataAccessed){

// return  "forbidden resource"
// } 

// return `${userData[userId].userName} has permissions`;

// }




// //call function

// console.log(protectedData(2))



// // add lists 
// const listOne=["ababa","Deribew","Daniel","John","David"];
// const listTwo=["Addis Ababa","Adama","New York","Paris","USA"]
// console.log("listOne: " ,listOne);
// console.log("listTwo: " ,listTwo);

// console.log("both list",[...listOne,...listTwo]);