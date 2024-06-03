'use client';

import React from 'react';
import { GoDash } from "react-icons/go";
import { useGetCourseCertificateQuery } from '@/redux/features/course/courseApi';
import { formatDate } from '@/lib/formatDate';

interface EnrolledCoursesProps {
  courses: any[];
}



interface CourseRowProps {
  course: any;
}

const CourseRow: React.FC<CourseRowProps> = ({ course }) => {
  const { data, isSuccess } = useGetCourseCertificateQuery(course?.course?.id);
  
  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-500">
      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {course?.course?.course}
      </th>
      <td className="px-6 py-4">
        {formatDate(course?.createdAt)}
      </td>
      <td className="px-6 py-2 text-center">
        <p className='text-xl font-medium text-green-600'>{course?.longestStreak?.streak || 0}</p>
        {course?.longestStreak && (
          <div className="flex items-center justify-center text-[10px] font-light font-sans">
            <span>{formatDate(course?.longestStreak?.startAt)}</span>
            <GoDash size={20} />
            <span>{formatDate(course?.longestStreak?.endAt)}</span>
          </div>
        )}
      </td>
      <td className="px-6 py-2 text-center">
        <p className='text-xl font-medium text-green-600'>{course?.streak?.streak || 0}</p>
        {course?.streak && (
          <div className="flex items-center justify-center text-[10px] font-light font-sans">
            <span>{formatDate(course?.streak?.startAt)}</span>
            <GoDash size={20} />
            <span>{formatDate(course?.streak?.endAt)}</span>
          </div>
        )}
      </td>
      <td className="px-6 py-4 text-center">
        {isSuccess && data ? `${data?.coursePercent}%` : '0%'}
      </td>
      <td className="px-6 py-4 text-center">
        {isSuccess && data ? (data?.coursePercent >= 100 ? 'Completed' : 'Ongoing') : 'Ongoing'}
      </td>
    </tr>
  );
};
















const EnrolledCourses: React.FC<EnrolledCoursesProps> = ({ courses }) => {
  return (
    <>
      {courses && courses.length ? (
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">Course Name</th>
                <th scope="col" className="px-6 py-3">Start On</th>
                <th scope="col" className="px-6 py-3 text-center">Longest Streak</th>
                <th scope="col" className="px-6 py-3 text-center">Current Streak</th>
                <th scope="col" className="px-6 py-3 text-center">Percent</th>
                <th scope="col" className="px-6 py-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {courses.map(course => (
                <CourseRow key={course.id} course={course} />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-500 dark:text-gray-400">No enrolled courses found.</p>
      )}
    </>
  );
};

export default EnrolledCourses;
