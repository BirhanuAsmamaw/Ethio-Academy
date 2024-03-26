import type { Metadata } from 'next'
import {IBM_Plex_Sans} from 'next/font/google'
import './globals.css'
import AppProvider from '@/providers/appProvider'
import Footer from '@/components/footer/footer'

import { Toaster } from 'react-hot-toast'


const IBM_plex_sans= IBM_Plex_Sans({ subsets: ['latin'] ,weight:['400', '500','600','700']})

export const metadata: Metadata = {
 
    title:'Ethio Exams Academy',
    description:'Unlock Your Potential with Ethio Exams Academy - Where Learning Meets Success!',
    keywords:'Programming, High School Courses, Freshman Courses, Entrance Exams, Exit Exams, Online Education, Lifelong Learning'


}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${IBM_plex_sans.className} bg-stone-200 dark:text-gray-200 dark:bg-gray-900  `}>
      <Toaster
  position="top-center"
  reverseOrder={false}
/>
        <AppProvider>
        <div className="">
          
        <div className="">
        {children}
        </div>
        <Footer/>
        </div>
        </AppProvider>
        </body>
    </html>
  )
}
