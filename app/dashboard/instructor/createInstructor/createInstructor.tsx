"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { useCreateInstructorMutation } from "@/redux/features/instructors/instructorApi";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";
import toast from "react-hot-toast";
import Login from "@/components/auth/login/login";

import CreateAccountName from "./CreateAccountName";
import CreateTitle from "./CreateTitle";

import { Button } from "@/components/ui/button";
import InstructorHero from "./intructorHero";
import CreateDescription from "./createDescription";

interface CreateTeacherProps {
  user: any;
}

const CreateTeacher: React.FC<CreateTeacherProps> = ({ user }) => {
  const router = useRouter();

  // Page state
  const [page, setPage] = useState<number>(0);

  const onBack = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const onNext = () => {
    if (page < 3) {
      setPage((prev) => prev + 1);
    }
  };

  // Create title state
  const [title, setTitle] = useState("");
  const handleTitleChange = (event: any) => {
    setTitle(event.target.value);
  };


  // Create Description
  const [description, setDescription] = useState("");
 
  // Create account name state
  const [account, setAccount] = useState("");
  const handleAccountChange = (event: any) => {
    setAccount(event.target.value);
  };

 


  const accountData={ 
  title: title||"",
  accountName:account||user?.name,
  description: description||""}

  const [createInstructor, { data, isSuccess, isLoading, isError }] = useCreateInstructorMutation();

  const onSubmit = async () => {
    await createInstructor(accountData);

    
  };

  if (!user) {
    return <Login user={user} />;
  }

  if (isSuccess) {
    return (
      <div className="h-screen w-full flex justify-center p-2 items-center">
        <div className="w-full md:max-w-md p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-left text-green-600 dark:text-green-400 mb-4">
            Account Created Successfully!
          </h1>
          <p className="text-left text-gray-700 dark:text-gray-300">
            Thank you for creating your teaching account. Your account is now under review, and you'll be notified once it is approved by our admin team.
          </p>
          <div className="mt-6 text-center">
            <div className="w-full flex justify-center">
              <IoCheckmarkDoneCircleSharp className="text-green-600 dark:text-green-400" size={100} />
            </div>
            <p className="text-gray-500 text-left tracking-tight text-sm dark:text-gray-400">
              We appreciate your patience and look forward to having you on board!
            </p>
          </div>
        </div>
      </div>
    );
  }

  

  if (user && user.teacher && !user.teacher.status) {
    router.push("/dashboard/profile");
    return null;
  }

  if (user && user.teacher && user.teacher.status) {
    router.push("/dashboard/instructor/account");
    return null;
  }

  if (isError) {
    toast.error("The Account is Already Created!!");
  }

  return (
    <div className="m-2 border rounded-md border-gray-200 dark:border-gray-600 w-full sm:p-2 flex justify-center bg-white shadow-md dark:bg-gray-800 sm:px-2 pt-4 pb-10 md:max-w-2xl flex-col gap-2">
      <div className="flex flex-col gap-2">
        <div className="pt-4">
          <h1 className="font-semibold text-2xl md:text-3xl text-center text-blue-600 dark:text-green-400">
            Welcome to EthioAcademy!
          </h1>
        </div>
        <div className="space-y-2 p-2 sm:p-4 ">
          <p className="font-medium text-lg sm:text-2xl tracking-tight !leading-tight border-b-2 py-2 border-gray-600 dark:border-gray-300 border-dotted">
            <span className="text-blue-600 dark:text-green-400">{user.name}</span>, your journey to inspire and educate begins here!
          </p>
          <div className="py-6 sm:py-10">
            {!page ? <InstructorHero onClick={onNext} /> : ""}
            {page ? (
              <div>
                <div className="flex justify-end w-full pr-6 pb-10">
                  <p className="diagonal-fractions text-2xl text-gray-500 dark:text-gray-400 font-medium">{page}/3</p>
                </div>
                {page === 1 && <CreateAccountName defaultValue={user?.name} onChange={handleAccountChange} />}
                {page === 2 && <CreateTitle onChange={handleTitleChange} />}
                {page === 3 && <CreateDescription value={description} setValue={setDescription}/>}

                <div className="py-10 gap-4 flex justify-end w-full">
                  {page > 1 && (
                    <Button
                      onClick={onBack}
                      className="transition rounded-full duration-300 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4"
                    >
                      Back
                    </Button>
                  )}
                  {page < 3 && (
                    <Button
                      onClick={onNext}
                      className="transition rounded-full duration-300 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4"
                    >
                      Next
                    </Button>
                  )}
                  {page === 3 && (
                    <Button
                    disabled={isLoading}
                      onClick={onSubmit}
                      className="transition rounded-full duration-300 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4"
                    >
                      {isLoading?"Creating....":"Create Account"}
                    </Button>
                  )}
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTeacher;
