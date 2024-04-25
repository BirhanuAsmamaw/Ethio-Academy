import React from 'react'
import AboutContainer from './aboutContainer';

const AboutComponent = () => {
  return (<div id='about' className=" space-y-20 bg-pink-50 dark:bg-black p-10">

         <h1 className='text-3xl font-semibold leading-10'>About</h1>


        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
<AboutContainer title='Mission 🚀:'className='bg-green-100 dark:bg-gray-800'>
   <p className='text-lg'>
Ethio Exams Academy is dedicated to providing a large cross-platform where teachers freely create courses,
design exams, and offer tutorials, tailored to meet Ethiopian curriculum standards. Our mission is to empower
students and educators, ensuring academic excellence and success.</p>
   </AboutContainer>


   <AboutContainer title='Platform Overview 🌐:'className='bg-rose-100 dark:bg-slate-800'>
   <p className='text-lg'>
Ethio Exams Academy serves as a comprehensive educational hub, where instructors can not only freely create and sell 
their own courses but also earn money easily through our website. 
It&apos;s a vibrant community where teachers and students come together to learn, grow, and succeed.</p>
   </AboutContainer>
</div>




<div className="grid grid-cols-1 md:grid-cols-2 gap-10">

<AboutContainer title='Key Features 🌟:'className='bg-blue-100 dark:bg-stone-800'>
   <ul className=' space-y-2  list-decimal leading-relaxed list-inside '>
    <li>Instructors can sell their courses and earn money easily through our platform. 💰</li>
    <li>Students access high-quality learning resources and receive certificates for their participation, fostering a sense of achievement and recognition. 🏆</li>
     <li>Our platform fosters healthy competition, making heroes out of both students and teachers as they excel academically. 🏅</li>
     <li>We offer awards and incentives to students and educators across the country, recognizing and celebrating their accomplishments. 🎉</li>

   </ul>
   </AboutContainer>


   <AboutContainer title='Vision 🔮:'className='bg-zinc-100  dark:bg-zinc-800'>
   <p className='text-lg  '>
   
At Ethio Exams Academy, we envision a future where education is accessible to all and where both students and educators are empowered to reach their full potential. Join us in our mission to redefine academic success and inspire a generation of Ethiopian scholars to excel and thrive.





</p>
   </AboutContainer>
</div>










        </div>


        

  )
}

export default AboutComponent;