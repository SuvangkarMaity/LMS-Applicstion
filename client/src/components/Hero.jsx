import { Search, User, Award } from 'lucide-react'
import React from 'react'
import HeroImg from '../assets/HeroImg.png'
import CountUp from 'react-countup'
import ImageSlider from './ImageSlider'
import ImageSlide from './ImageSlide'

const Hero = () => {
  return (
    <div className='bg-slate-800 pt-14'>
       <div className='lg:h-[200px] max-w-7xl mx-auto flex md:flex-row flex-col  gap-10 items-center '></div>
       {/* text section */}
       <div className='space-y-7 px-4 md:px-0 ml-10'>
          <h2 className='text-4xl mt-10 md:mt-0 md:text-6xl font-extrabold text-gray-200'>Explore Our <span className='text-blue-500'> 14000+ </span><br/> Online courses for all </h2>
          <p className='text-gray-300 text-lg'>Welcome to Your Gateway Knowledge!</p>
          <div className='inline-flex relative'>
             <input type="text" placeholder='Search Your Course Here...' className='bg-gray-200 w-[350px] md:w-[450px] text-gray-800 p-4 pr-40 rounded-r-xl placeholder:text-gray-500' />
             <button className='px-4 py-[14px] flex gap-1 items-center bg-blue-500 font-semibold absolute right-0 text-white rounded-r-lg text-xl'>Search<Search width={20} height={20}/></button>
          </div>
       </div>
       {/* image section */}
       <div className='flex md:h-[200px] items-end relative px-4 md:px-0 ml-155 mt-0.100'>
          {/* <img src={HeroImg} alt="" className='w-[750px] shadow-blue-500 drop-shadow-lg'/> */}
             {/* <ImageSlider/> */}
             <ImageSlide/>
             

           <div className='bg-slate-200 hidden md:flex gap-3 items-center rounded-md absolute top-[35%] right-0 px-4 py-2 -mt-105 mr-13 '>
            <div className='rounded-full bg-blue-400 p-2 text-white'>
               <User/>
            </div>
            <div className='mt-0.5'>
               <h2 className='font-bold text-2xl'><CountUp end={4500}/>+</h2>
               <p className='italic text-sm text-gray-600 leading-none'>Active Students</p>
            </div> 
          </div> 
          <div className='bg-slate-200 hidden md:flex gap-3 items-center rounded-md absolute top-[15%] left-0 px-4 py-2 -mt-95 ml-35 '>
            <div className='rounded-full bg-blue-400 p-2 text-white'>
               <Award/>
            </div>
            <div className=''>
               <h2 className='font-bold text-2xl'><CountUp end={684}/>+</h2>
               <p className='italic text-sm text-gray-600 leading-none'>Certified Students</p>
            </div>
          </div> 
       </div>
    </div>
    
  )
}

export default Hero