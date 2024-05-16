import React from 'react'
import AboutContainer from './aboutContainer';

const AboutComponent = () => {
  return (<section id='about' className=" z-20 space-y-20 bg-zinc-50 dark:bg-black px-2 py-4 md:px-20 md:py-32">

<h1 className='w-full tracking-tight  !leading-tight text-xl text-gray-800 dark:text-gray-100 md:text-4xl font-semibold border-b-2 border-double p-2  border-zinc-200 dark:border-gray-700 pl-4'>About Us</h1>


        <div className="grid mt-32 w-full grid-cols-1 md:grid-cols-2 gap-10">
<AboutContainer title='Mission 🚀'className='bg-green-100 dark:bg-gray-800'>
   <p className='text-[16px] md:text-lg w-full text-left'>
Ethio Exams Academy is dedicated to providing a large cross-platform where teachers freely create courses,
design exams, and offer tutorials, tailored to meet Ethiopian curriculum standards. Our mission is to empower
students and educators, ensuring academic excellence and success.</p>
   </AboutContainer>


   <AboutContainer title='Platform Overview 🌐'className='bg-blue-100 dark:bg-zinc-800'>
   <p className='text-[16px] md:text-lg w-full text-left'>
Ethio Exams Academy serves as a comprehensive educational hub, where instructors can not only freely create and sell 
their own courses but also earn money easily through our website. 
It&apos;s a vibrant community where teachers and students come together to learn, grow, and succeed.</p>
   </AboutContainer>
</div>




<div className="grid grid-cols-1 md:grid-cols-2 gap-10">

<AboutContainer title='Key Features 🌟'className='bg-blue-100 w-full dark:bg-zinc-800'>
   <ul className=' space-y-4  w-full list-decimal text-left  list-inside text-[16px] md:text-lg '>
    <li>Instructors can sell their courses and earn money easily through our platform. 💰</li>
    <li>Students access high-quality learning resources and receive certificates for their participation, fostering a sense of achievement and recognition. 🏆</li>
     <li>Our platform fosters healthy competition, making heroes out of both students and teachers as they excel academically. 🏅</li>
     <li>We offer awards and incentives to students and educators across the country, recognizing and celebrating their accomplishments. 🎉</li>

   </ul>
   </AboutContainer>


   <AboutContainer title='Vision 🔮'className='bg-green-100 dark:bg-gray-800'>
   <p className='text-[16px] md:text-lg  text-left w-full'>
   
At Ethio Exams Academy, we envision a future where education is accessible to all and where both students and educators are empowered to reach their full potential. Join us in our mission to redefine academic success and inspire a generation of Ethiopian scholars to excel and thrive.





</p>
   </AboutContainer>
</div>










        </section>


        

  )
}

export default AboutComponent;