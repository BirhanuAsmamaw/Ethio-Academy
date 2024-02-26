import type { Metadata } from 'next'
import { Noto_Sans} from 'next/font/google'
import './globals.css'
import AppProvider from '@/providers/appProvider'
import Footer from '@/components/footer/footer'
import { Toaster } from 'react-hot-toast'


const josefin= Noto_Sans({ subsets: ['latin'] ,weight:['400', '500','600','700']})

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${josefin.className} bg-gray-100 dark:text-gray-200 overflow-x-hidden mx-auto dark:bg-gray-900 `}>
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
