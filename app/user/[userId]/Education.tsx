import React from 'react'

const EducationBackground = () => {
  return (<div className="py-3 sm:order-none order-1">
  <h2 className="text-lg font-poppins font-bold text-blue-500">Education Background</h2>
  <div className="border-2 w-20 border-blue-500 my-3"></div>

  <div className="flex flex-col space-y-1">

      <div className="flex flex-col">
          <p className="font-semibold text-xs text-gray-700 dark:text-gray-300">2021</p>
          <p className="text-sm font-medium">
              <span className="text-green-700">B.E. (INFORMATION TECHNOLOGY)</span>, PIMPRI CHINCHWAD
              COLLEGE OF ENGINEERING, PUNE.
          </p>
          <p className="font-bold text-xs text-gray-700 dark:text-gray-300 mb-2">Percentage: 76.61</p>
      </div>
      <div className="flex flex-col">
          <p className="font-semibold text-xs text-gray-700 dark:text-gray-300">2017</p>
          <p className="text-sm font-medium"><span className="text-green-700">HSC</span>, RAJARSHI SHAHU
              COLLEGE, LATUR.</p>
          <p className="font-bold text-xs text-gray-700 dark:text-gray-300 mb-2">Percentage: 80.77</p>
      </div>
      <div className="flex flex-col">
          <p className="font-semibold text-xs text-gray-700 dark:text-gray-300">2015</p>
          <p className="text-sm font-medium"><span className="text-green-700">SSC</span>, DNYANESHWAR HIGH
              SCHOOL, LATUR.</p>
          <p className="font-bold text-xs text-gray-700 dark:text-gray-300 mb-2">Percentage: 93.80</p>
      </div>

  </div>
</div>
  )
}

export default EducationBackground;