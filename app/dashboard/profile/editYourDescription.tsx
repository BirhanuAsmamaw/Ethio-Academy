"use client"
import CModal from '@/components/customModal'
import TextEditor from '@/components/editor/editor'
import { useUpdateProfileMutation } from '@/redux/features/user/userApi'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { MdModeEdit } from "react-icons/md";

const EditYourDescription = ({user}:{user:any}) => {
  const router = useRouter();

  const [updateDescription, { isSuccess, isLoading }] = useUpdateProfileMutation();

  const [description, setDescription] = useState(user?.description||"")
  const onSubmit = async() => {
    await updateDescription({description:description})
  }

  useEffect(() => {
    if (isSuccess) {
      router.push('/dashboard/profile');
      router.refresh();
      toast.success('Updated your description successfully!');
    }
  }, [isSuccess, router]);
  return (
    <div className="p-2 sm:p-4 space-y-2">
      <h3 className='text-xl flex gap-2 justify-between w-full items-center font-medium leading-10 border-b-2 border-slate-200 dark:border-gray-600'>
        <span>About Me</span>
        <CModal
          disabled={isLoading}
          buttonLabel={isLoading ? 'Updating...' : 'Update'}
          onClick={onSubmit}
          className='bg-transparent p-0 hover:bg-transparent hover:text-black hover:dark:text-white text-gray-600 dark:text-gray-200'
          modalName={<MdModeEdit size={24} />}
        >
          <div className=" min-w-[375px] md:min-w-[500px]">
          <TextEditor
            value={description || 'Write about yourself here...'}
            setValue={setDescription}
          />
          </div>
        </CModal>
      </h3>
      <div className='text-wrap' dangerouslySetInnerHTML={{ __html: description||user?.description }} />
    </div>
  )
}

export default EditYourDescription
