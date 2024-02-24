"use client"
import axios from "axios"
import { useEffect, useState } from "react"
import LessonClient from "./lessonClient"

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
  

  return ( <div className="">
    <LessonClient lesson={lesson}/>
  </div> );
}
 
export default LessonPage;