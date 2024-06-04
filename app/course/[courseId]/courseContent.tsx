"use client";
import { GiCheckMark } from "react-icons/gi";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useGetCourseCertificateQuery } from "@/redux/features/course/courseApi";
import { usePathname } from "next/navigation";
import Link from "next/link";

// Function to check if a lesson has a certificate


function lessonHasCertificate(certificates: any[], lessonId: string): boolean {
 
  return certificates.some(certificate => certificate.lesson.id === lessonId);
}

interface CourseContentProps {
  course: any | null;
}

const CourseContent: React.FC<CourseContentProps> = ({ course }) => {

  const pathName = usePathname();

  
  const chapterId = pathName?.split("/")[3] || '0';

  if (!course) {
    return null;
  }

  // Fetch course certificates
  const { data: certificatesData } = useGetCourseCertificateQuery(course?.id);
  const certificates = certificatesData?.lessonCertificates || [];

  return (<Accordion type="multiple" defaultValue={[chapterId]} className="w-full">
      {course?.chapters?.length && course?.chapters.map((chapter: any, index: number) => (
        <AccordionItem
          key={index}
          value={chapter.id}
          className="border my-2 bg-white dark:bg-gray-800 w-full border-slate-200 dark:border-gray-600 px-2 md:px-6 rounded-lg"
        >
          <AccordionTrigger className="w-full hover:no-underline">
            <div className="flex gap-2 text-start w-full capitalize">
              <span className="h-6 w-6 rounded-full bg-green-400 mt-2 flex items-center justify-center text-sm text-black">
                {index + 1}
              </span>
              <span className="text-lg mt-2 font-semibold">{chapter.title}</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="w-full p-0">
            <div className="list-none p-0">
              {chapter?.lessons?.length && chapter.lessons.map((lesson: any, ind: number) => (
                <Link
                href={`/course/${course.id}/${chapter.id}/${lesson.id}`}
                  key={ind}
                
                  className={` text-gray-700 dark:text-gray-300 no-underline text-base flex gap-x-2 items-center border-b hover:underline hover:text-blue-600 hover:dark:text-blue-400 pt-1 pb-2 transition duration-300 
                    ${pathName === `/course/${course.id}/${chapter.id}/${lesson.id}` && 'text-green-600 dark:text-green-400 font-semibold'} text-start py-1`}
                ><span className={` 
                ${lessonHasCertificate(certificates, lesson.id) ? ' text-green-500' : 'opacity-0'}`}>
                {lessonHasCertificate(certificates, lesson.id) ?<GiCheckMark size={18}/>:<div className="ml-4"/> }
              </span>
                  <div className=" items-center  ">
                    <span className="font-medium">Lesson {ind + 1}:</span>
                    <span>{lesson.title}</span>
                    
                  </div>
                </Link>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default CourseContent;
