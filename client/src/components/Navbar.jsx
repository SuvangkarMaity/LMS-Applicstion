
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { GraduationCap } from 'lucide-react';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "../components/ui/button";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner'
import axios from 'axios';
import { setUser } from '../redux/authSlica';


const Navbar = () => {
   const {user} = useSelector(store => store.auth)
   const dispatch = useDispatch()
   const navigate = useNavigate()

   const logoutHandler = async (e) => {
       try{
         const res = await axios.get('http://localhost:8000/api/v1/user/logout', {withCredentials:true}) 
         if(res?.data?.success){
            navigate('/')
            dispatch(setUser(null)) 
            toast.success(res.data.message)
         }
       } catch(error){
         console.log(error);
         //toast.error(error?.response?.data?.message)
         const message = error?.response?.data?.message || "Logout faild. please try again";
         toast.error(message);
       }
   }

  return (
   <>
    <div className='bg-gray-900 z-50 w-full py-3 fixed top-0'>
       <div className='max-w-7xl mx-auto flex justify-between'>
          {/* logo section */}
          <Link to="/">
            <div className='flex gap-1'>
             <GraduationCap className='text-gray-300 h-10 w-10'/>
             <h1 className='text-gray-300 text-3xl font-bold'>LMS</h1>
            </div>
          </Link>

          {/* menu section */}
          <nav>
            <ul className='flex gap-7 text-xl items-center font-semibold text-white'>
                <Link to="/"><li className='cursor-pointer'>Home</li></Link>
                <Link to="/courses"><li className='cursor-pointer'>Courses </li></Link> 

                {
                    !user ? (
                       <div className='flex gap-3'>
                        <Link to="/login"> <Button className='bg-purple-700 hover:bg-gray-800'>Login</Button></Link> 
                        <Link to="/signup"><Button className='bg-purple-700 hover:bg-gray-800'>Signup</Button></Link>
                       </div>
                
                    ): (
                         <div className='flex flex-center gap-7'>
                           {
                              user.role === "instructor" && <Link to="/admin/dashboard"><li className='cursor-pointer'>Admin</li></Link>
                           }
                             <Link to="/profile">
                                <Avatar>
                                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" className='h-8 w-10 rounded-full m-2'/>
                                  <AvatarFallback>CN</AvatarFallback>
                               </Avatar>
                             </Link>
                             
                             <Button onClick={logoutHandler} className='bg-purple-500 hover:bg-blue-700'>Logout</Button>
                         </div>
                    )
                }

            </ul>
          </nav>
       </div>
    </div>
 </>
  )
}

export default Navbar


