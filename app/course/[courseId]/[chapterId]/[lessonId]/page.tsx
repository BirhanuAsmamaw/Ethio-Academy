"use client"
import axios from "axios"
import { useEffect, useState } from "react"

interface IParams{
  lessonId: string
}
const LessonPage = ({params}:{params:IParams}) => {


  const [lesson,setLesson]=useState<any>(null)
  useEffect(()=>{
    async function fetchData() {
      try{
        const response=await axios.get(`/api/lesson/${params.lessonId}`)
        setLesson(response.data);
      }

      catch(error){

      }
    }
    fetchData();
    
  },[params.lessonId])
  
  console.log("lesson:-",lesson)

  return ( <div className="">
    <h1>{lesson.title}</h1>
  </div> );
}
 
export default LessonPage;