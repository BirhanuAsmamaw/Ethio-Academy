
import Link from 'next/link';
import { CiLinkedin } from "react-icons/ci";
import { FaTelegramPlane } from "react-icons/fa";
import Logo from '../logo';
const Footer = () => {
  return ( 

    <footer className="bg-white dark:bg-gray-800">
        <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
            <div className="md:flex md:justify-between">
              <div className="mb-6 md:mb-0">
              <Logo/>
              </div>
              <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                  
                  <div>
                      <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Exam</h2>
                      <ul className="text-gray-500 list-none dark:text-gray-400 text-sm ">
                          <li className="">
                              <Link href="/exams/Exit" className="no-underline text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200  hover:underline">Univerity Exit Exams (Exit) </Link>
                          </li>
                          <li>
                              <Link  href="/exams/EUEE"  className="no-underline text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200  hover:underline">University Entrance Exams (EUEE)</Link>
                          </li>

                          <li>
                              <Link  href="/exams/Remedial"  className="no-underline text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200  hover:underline">Remedial Exams</Link>
                          </li>


                          <li>
                              <Link  href="/exams/COC"  className="no-underline text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200  hover:underline">COC Exams</Link>
                          </li>
                      </ul>
                  </div>

                  <div>
                      <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Legal</h2>
                      <ul className="text-gray-500 text-sm list-none dark:text-gray-400 ">
                          <li className="">
                              <Link href="/privancy-policy" className="no-underline text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200  hover:underline">Privacy Policy </Link>
                          </li>
                          <li>
                              <Link  href="/privancy-policy"  className="no-underline text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200  hover:underline">Terms &amp; Conditions</Link>
                          </li>
                      </ul>
                  </div>


                  <div>
                      <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Follow Us</h2>
                      <ul className="text-gray-500 text-sm list-none dark:text-gray-400 ">
                          <li className="">
                              <Link href="https://www.linkedin.com/in/deribew-shimelis-182895297" className=" flex items-center gap-x-2 no-underline text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200  hover:underline"><CiLinkedin size={20}/> <span>Linkedin</span> </Link>
                          </li>
                          <li className="">
                              <Link href="https://t.me/Derishemi" className=" flex items-center gap-x-2 no-underline text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200  hover:underline"><FaTelegramPlane size={20}/> <span>Telegram</span> </Link>
                          </li>
                      </ul>
                  </div>
              </div>
          </div>
          <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
          <div className="sm:flex sm:items-center sm:justify-center">
              <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 <Link href="/" className="no-underline text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200  hover:underline">Ethio Exams Academy™</Link>. All Rights Reserved.
              </span>
             
          </div>
        </div>
    </footer>
     );
}
 
export default Footer;