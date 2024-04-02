import ExamsCategoryCard from '@/components/card/examscategoryCard';
import React from 'react'

interface ExamPageClientProps{
  exams:any[]|null;
}
const ExamPageClient:React.FC<ExamPageClientProps> = ({exams}) => {
  if(!exams){
    return null;
  }
  return (<div className="min-h-screen w-full justify-center items-center">
<div className="w-full lg:w-11/12 xl:px-20   space-y-4">

<h1 className='w-full text-xl md:text-4xl font-semibold border-b-2 border-double p-2 dark:text-gray-300 border-gray-200 dark:border-gray-700 pl-4'>Exams</h1>

<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 justify-center flex-wrap gap-4 p-4 md:px-10'>
       {exams?.map((exam)=>{
        return <ExamsCategoryCard key={exam.id} name={exam.examType} 
        url={`/dashboard/exam-questions/${exam.url} `}
        image={exam.cover?.public_url}/>
       })}

      </div>
      </div>
  </div>
  )
}

export default ExamPageClient