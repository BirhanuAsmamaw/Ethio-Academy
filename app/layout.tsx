import type { Metadata } from 'next'
import {IBM_Plex_Sans} from 'next/font/google'
import './globals.css'
import AppProvider from '@/providers/appProvider'


import { Toaster } from 'react-hot-toast'
import FooterClient from '@/components/footer/footerClient'



const IBM_plex_sans= IBM_Plex_Sans({ subsets: ['latin'] ,weight:['400', '500','600','700']})

export const metadata: Metadata = {
  title: 'EthioAcademy | Empowering Students and Instructors',
  description: 'Unlock your potential with EthioAcademy - Where students and instructors thrive together through comprehensive learning resources and expert guidance.',
  keywords: 'EthioAcademy, Programming, High School Courses, Freshman Courses, Entrance Exams, Exit Exams, Online Education, Lifelong Learning, Student Success, Instructor Resources',
 
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  return (
    <html lang="en">
      <body className={`${IBM_plex_sans.className} bg-[#F8F4EC] custom-scrollbar dark:text-gray-300 dark:bg-gray-900 overflow-x-hidden  `}>
      <Toaster
  position="top-center"
  reverseOrder={false}
/>
        <AppProvider>
        <div className="">
          
        <div className="">
   
         {children}
  
        </div>
        <FooterClient/>
        </div>
        </AppProvider>
        </body>
    </html>
  )
}
