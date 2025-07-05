import { Button } from '../../components/ui/button';
import React, { useEffect } from 'react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "../../components/ui/table"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setCourse } from '../../redux/courseSlice';
import { Badge } from '../../components/ui/badge';
import { Edit } from 'lucide-react';

function Course(props) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {course} = useSelector(store => store.course)
    useEffect(()=>{
      const getCreatorCourse = async ()=>{
         try{
            const res = await axios.get('http://localhost:8000/api/v1/course', {withCredentials:true})
            if(res.data.success){
                 dispatch(setCourse(res.data.courses))     
            }
         }catch(error){
            console.log(error);
         }
      } 
      getCreatorCourse()
    },[]);
    return (
        <div className='md:p-10 p-4 w-full h-screen'>
            <Button className='bg-blue-500' onClick={()=> navigate('create')}>Create Course</Button>
            <Table className='mt-10'>
                <TableCaption>A list of your recent Courses</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Course</TableHead>
                        <TableHead className="text-right">Price</TableHead>
                        <TableHead className="text-center">Status</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {course?.map((course) => (
                        <TableRow key={course._id}>
                            <TableCell className="md:w-[300px] flex items-center gap-2">
                                <img src={course?.courseThumbnail} alt='Thumbnail' className='w-20 hidden md:block rounded-sm'/>
                                {course.courseTitle}
                            </TableCell>
                            <TableCell className="font-medium text-right">{course.coursePrice || "NA"}</TableCell>
                            <TableCell className='text-center'>
                                <Badge className={course.isPublished ? "bg-green-400" : "bg-red-400"}>{course.isPublished ? "Published":"Draft"}</Badge>
                            </TableCell>
                            <TableCell className="text-right">
                                <Button variant='ghost' onClick={()=>navigate(`${course._id}`)}><Edit/></Button>
                            </TableCell>
                           
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

export default Course;