
import { RadioGroup } from '../../components/ui/radio-group'
import { Input } from '../../components/ui/input'
import { Label } from '@radix-ui/react-label'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../../components/ui/button'
import axios from 'axios'
import { toast } from 'sonner'
import {useNavigate} from 'react-router-dom'

const Signup = () => {
   const navigate = useNavigate()
   const [user, setUser] = useState({
      name:"",
      email:"",
      password:"",
      role:"student"
   })

   const handleChange = (e)=>{
       const {name, value} = e.target;
      setUser((prev)=>({
        ...prev,
        [name]:value
       }))
   }

   const handleSubmit = async (e)=>{
      e.preventDefault(),
      console.log(user)
      try{
         const response = await axios.post('http://localhost:8000/api/v1/user/register', user, {
            headers:{
               "Content-Type":"application/json"
            },
            withCredentials:true
         })
         if(response.data.success){
            navigate("/login")
            toast.success(response.data.message) 
         }else{
            toast.error("Something went wrong")
         }

      }catch (error){
         console.log(error)
      }
   }

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100'>
        <div className='bg-white shadod-lg rounded-lg p-8 max-w-md w-full'>
           <h1 className='text-2xl font-bold text-center text-gray-800 mb-4'>Create Your Account</h1>
           <p className='text-center text-gray-600 mb-8'>Join us today! It's quick and easy</p>
           {/* Name input */}
           <div className='mb-4'>
              <Label>Full Name</Label>
              <Input placeholder="Enter Your Name" 
              name="name"
              value={user.name}
              onChange={handleChange}
              type="text"
              id="name" />
           </div>
           <div className='mb-4'>
              <Label>Email Address</Label>
              <Input placeholder="Enter Your Email"
              name="email"
              type="email"
              value={user.email}
              onChange={handleChange} />
           </div>
           <div className='mb-4'>
              <Label>Password</Label>
              <Input placeholder="Create a Password"
              name="password"
              type="password"
              value={user.password} 
              onChange={handleChange} />
           </div>
           <div className='mb-4'>
              <Label>Role</Label>
              <RadioGroup className="flex gap-2 mt-2 peer">
                 <div className='flex items-center'>
                     <Input 
                     type="radio"
                     id="role1"
                     name="role" 
                     value="student"
                     checked={user.role === 'student'}
                     onChange={handleChange} 
                     className="w-2 h-2 text-blue-600"/>
                     <Label htmlFor="role1">Student</Label>
                   </div>
                   <div className='flex items-center '>
                     <Input  
                     type="radio"
                     id="role2"
                     name="role" 
                     value="instructor"
                     checked={user.role === 'instructor'}
                     onChange={handleChange} 
                     className="w-2 h-2 text-blue-600"/>
                     <Label htmlFor="role2">Instructor</Label>
                   </div>  
              </RadioGroup>  
           </div>
           <Button onClick={handleSubmit} className="w-full bg-purple-500 hover:bg-green-600">Signup</Button>
           <p className='text-center mt-4'>Already have an account? <Link to="/login" className='text-blue-500 hover:underline'>Log in</Link></p>   
        </div>
    </div>
  )
}

export default Signup