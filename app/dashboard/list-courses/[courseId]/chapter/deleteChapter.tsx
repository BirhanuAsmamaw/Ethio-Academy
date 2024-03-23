import React from 'react'

const DeleteChapter = () => {
  return (<div className="py-6 md:p-6 flex w-full justify-center gap-1">
      
  <div className="w-full px-6  py-4 lg:w-8/12 space-y-4 bg-slate-100 dark:bg-slate-900">
    <p className='text-sm backdrop:md'>Are You Sure To Delete This Chapter?</p>
    <div className="w-full flex justify-end">
    <button className='text-rose-500 font-medium hover:text-rose-600 '>Delete</button>
    </div>
    </div>
  </div>
  )
}

export default DeleteChapter