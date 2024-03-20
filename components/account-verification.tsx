const AccountVerification = () => {
  return ( 
    <div className="m-2 border border-gray-200 dark:border-gray-600  rounded-[10px] bg-white dark:bg-gray-800 px-2 pt-4 pb-10 w-full md:max-w-md flex flex-col  gap-4">
      <h1 className="font-semibold text-[16px]">Verify Your Account</h1>
       
<form className="w-full">
    <div className="flex  justify-center mb-2 space-x-2 rtl:space-x-reverse">
        <div>
            <label htmlFor="code-1" className="sr-only">First code</label>
            <input type="text" maxLength={1} data-focus-input-init data-focus-input-next="code-2" id="code-1" className="block w-9 h-9 py-3 text-sm font-extrabold text-center text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required />
        </div>
        <div>
            <label htmlFor="code-2" className="sr-only">Second code</label>
            <input type="text" maxLength={1} data-focus-input-init data-focus-input-prev="code-1" data-focus-input-next="code-3" id="code-2" className="block w-9 h-9 py-3 text-sm font-extrabold text-center text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required />
        </div>
        <div>
            <label htmlFor="code-3" className="sr-only">Third code</label>
            <input type="text" maxLength={1} data-focus-input-init data-focus-input-prev="code-2" data-focus-input-next="code-4" id="code-3" className="block w-9 h-9 py-3 text-sm font-extrabold text-center text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required />
        </div>
        <div>
            <label htmlFor="code-4" className="sr-only">Fourth code</label>
            <input type="text" maxLength={1} data-focus-input-init data-focus-input-prev="code-3" data-focus-input-next="code-5" id="code-4" className="block w-9 h-9 py-3 text-sm font-extrabold text-center text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required />
        </div>
       
    </div>
    <p id="helper-text-explanation" className="mt-2 text-sm text-gray-500 dark:text-gray-400">Please introduce the 4 digit code we sent via email.</p>
</form>

    </div>
   );
}
 
export default AccountVerification;