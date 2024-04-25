
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
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
                      <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Legal</h2>
                      <ul className="text-gray-500 dark:text-gray-400 font-medium">
                          <li className="mb-4">
                              <Link href="/privancy-policy" className="no-underline text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200  hover:underline">Privacy Policy </Link>
                          </li>
                          <li>
                              <Link  href="/privancy-policy"  className="no-underline text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200  hover:underline">Terms &amp; Conditions</Link>
                          </li>
                      </ul>
                  </div>
              </div>
          </div>
          <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
          <div className="sm:flex sm:items-center sm:justify-between">
              <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 <Link href="/" className="no-underline text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200  hover:underline">Ethio Exams Academy™</Link>. All Rights Reserved.
              </span>
             
          </div>
        </div>
    </footer>
     );
}
 
export default Footer;