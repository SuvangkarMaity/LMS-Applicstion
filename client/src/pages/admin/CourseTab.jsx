import { Label } from '../../components/ui/label'
import { Button } from '../../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import React, { useEffect, useState } from 'react'
import { Input } from '../../components/ui/input'
import RitchTextEditor from '../../components/RitchTextEditor'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select"
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setCourse } from '../../redux/courseSlice'
import { Loader2 } from 'lucide-react'
import axios from 'axios'

const CourseTab = () => {
  const params = useParams()
  const id = params.courseId;
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {course} = useSelector(store => store.course)
  const selectCourse = course.find(course => course._id === id)

  const [selectedCourse, setSelectedCourse] = useState(selectCourse)
  const [loading, setLoading] = useState(false)

  const getCourseById = async ()=>{
    try{
      const res = await axios.get(`http://localhost:8000/api/v1/course/${id}`, {withCredentials:true})
      if(res.data.success){
        setSelectedCourse(res.data.course)
      }
    }catch(error){
      console.log(error)
    }
  } 
  useEffect(()=>{
    getCourseById()
  })

  const [input, setInput] = useState({
    courseTitle:selectedCourse?.courseTitle,
    subTitle:selectedCourse?.subTitle,
    description:selectedCourse?.description,
    category:selectedCourse?.category,
    courseLevel:selectedCourse?.courseLevel,
    coursePrice:selectedCourse?.coursePrice,
    file:"" 
  })
  const [previewThumbnail, setPreviewThumbnail] = useState(selectedCourse?.Thumbnail)

  const changeEventHandler = (e)=>{
     const {name, value} = e.target;
     setInput({...input, [name]:value})
  }

  const selectCategory = (value)=>{
    setInput({...input, [category]:value})
  }

   const selectCourseLevel = (value)=>{
    setInput({...input, courseLevel:value})
  }

  //get file
  const selectThumbnail = (e)=>{
    const file = e.target.files?.[0];
    if(file){
      setInput({...input, courseThumbnail:file})
      const fileReader = new FileReader()
      fileReader.onload = () => setPreviewThumbnail(fileReader.result)
      fileReader.readAsDataURL(file)
    }
  }

  const updateCourseHandler = async () => {
    const formData = new FormData();
    formData.append("courseTitle", input.courseTitle);
    formData.append("subTitle", input.subTitle);
    formData.append("description", input.description);
    formData.append("category", input.category);
    formData.append("courseLevel", input.courseLevel);
    formData.append("coursePrice", input.coursePrice);
    formData.append("file", input.courseThumbnail);

    try{
      setLoading(true)
      const res = await axios.put(`http://localhost:8000/api/v1/course/${id}`, formData,
       { headers:{
          "Content-Type": "multipart/form-data"
        },
        withCredentials:true
    }) 
    if(res.data.success){
      navigate('lecture')
      toast.success(res.data.message)
      dispatch([...course, setCourse()])
    }
    }catch(error){
       console.log(error);
    }finally{
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader className='flex md:flex-row justify-between'>
        <div>
          <CardTitle>Basic Course Information</CardTitle>
          <CardDescription>Make changes to your courses here. Click save when you're done.</CardDescription>
        </div>
        <div className='space-x-2'>
          <Button className="bg-gray-800">Publish</Button>
          <Button variant='destructive'>Remove Course</Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className='space-y-4 mt-5'>
          <div>
            <Label>Title</Label>
            <Input value={input.courseTitle} onChange={changeEventHandler} type="text" name="courseTitle" placeholder="Ex. Fullstack Developer" />
          </div>
          <div>
            <Label>Subtitle</Label>
            <Input value={input.subTitle} onChange={changeEventHandler} type="text" name="subTitle" placeholder="Ex. Become a Fullstack Developer from zero to hero in 3 months" />
          </div>
          <div>
            <Label>Description</Label>
            <RitchTextEditor input={input} setInput={setInput}/>
          </div>
          <div className='flex md:flex-row flex-wrap gap-1 items-center md:gap-5'>
            <div>
              <Label>Category</Label>
              <Select defaultValue={input.category} onValueChange={selectCategory}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Category</SelectLabel>
                    <SelectItem value="Next JS">Next JS</SelectItem>
                    <SelectItem value="Data Science">Data Science</SelectItem>
                    <SelectItem value="Frontend Development">Frontend Development</SelectItem>
                    <SelectItem value="Backend Development">Backend Development</SelectItem>
                    <SelectItem value="MERN Stack">MERN Stack Development</SelectItem>
                    <SelectItem value="Java">Java Full-stack Development</SelectItem>
                    <SelectItem value="Python">Python Full-stack Development</SelectItem>
                    <SelectItem value="Docker">Docker</SelectItem>
                    <SelectItem value="Cloud Computing">Cloud Computing</SelectItem>
                    <SelectItem value="MongoDB">MongoDB</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
               <Label>Course Level</Label>
               <Select defaultValue={input.courseLevel} onValueChange={selectCourseLevel}>
                <SelectTrigger className="w-[180px]">
                   <SelectValue placeholder="Select a course level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Course Level</SelectLabel>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Advance">Advance</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
               <Label>Price in (INR)</Label>
               <Input
               type="number"
               name="coursePrice"
               value={input.coursePrice}
               onChange={changeEventHandler}
               placeholder="199"
               className="w-fit"
               /> 
            </div> 
          </div>
          <div>
              <Label>Course Thumbnail</Label>
              <Input
               type="file"
               id="file"
               onChange={selectThumbnail}
               placeholder="199"
               accept="image/*"
               className="w-fit"
               /> 
               {
                 previewThumbnail && (
                   <img src={previewThumbnail} alt='Thumbnail' className='w-64 my-2'/>
                 )
               }
            </div>
            <div className='flex gap-2'>
              <Button onClick={()=> navigate('/admin/course')} variant="outline">Cancel</Button>
              <Button className="bg-gray-800 hover:bg-gray-900" disabled={loading} onClick={updateCourseHandler}>
                 {
                  loading ? (
                    <>
                     <Loader2 className='mr-2 w-4 h-4 animate-spin'/>
                      Please Wait
                    </>
                  ):("Save")
                 }
              </Button>
            </div>
        </div>
      </CardContent>
    </Card>

  )
}

export default CourseTab