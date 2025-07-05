
import Hero from '../components/Hero'
import React from 'react'
import { coursesJson } from './Courses'
import CourseCard from './CourseCard'

const Home = () => {
  return (
    <div>
       <Hero/>
       <div className='pt-10'>
         <h1 className='text-4xl font-bold text-center mb-4 text-gray-800'>Our Courses</h1>
          <p className='text-center text-gray-600 mb-12'>Explore Our curated courses to boost your skills and career. Whether you are a beginner or an expert, We have something for everyone.</p>
       </div>
       <div className='max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
        {
        coursesJson.slice(0,6).map((course)=>{
          return <CourseCard course={course}/>
        })
       }
       </div>
       
    </div>
  )
}

export default Home