import React from 'react'

const AccountSuspended = () => {
  return (<div className="max-w-md w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4">
    <div className="flex items-center space-x-4">
      <div className="flex-shrink-0">
        <svg
          className="h-12 w-12 text-red-600 dark:text-red-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16h-1v-4h-1m1-4h.01M12 12v.01M12 18v2M6.7 6.7l.7.7M17.3 17.3l-.7-.7M6.7 17.3l.7-.7M17.3 6.7l-.7.7"
          />
        </svg>
      </div>
      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
          Account Suspended
        </h2>
        <p className="mt-1 text-gray-600 dark:text-gray-400">
          Your account has been suspended. Please wait while our admin reviews your message.
        </p>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
                For urgent inquiries, please contact us at <strong>+251930793119</strong>.
              </p>
      </div>
    </div>
  </div>
  )
}

export default AccountSuspended