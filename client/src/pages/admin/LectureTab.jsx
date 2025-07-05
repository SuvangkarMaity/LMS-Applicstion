import { Button } from '../../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import React, { useState } from 'react'
import { Label } from '@radix-ui/react-label'
import { Input } from '../../components/ui/input'
import { Switch } from '../../components/ui/switch'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import axios from 'axios'
import { setLecture } from '../../redux/lectureSlice'

const LectureTab = () => {
    const params = useParams()
    const { courseId, lectureId } = params;
    const { lecture } = useSelector(store => store.lecture)
    const selectedLecture = lecture.find(lecture => lecture._id === lectureId)
    const [lectureTitle, setLectureTitle] = useState(selectedLecture.lectureTitle)
    const [uploadVideoInfo, setUploadVideoInfo] = useState(null)
    const [isFree, setIsFree] = useState(selectedLecture.isPreviewFree)
    const [mediaProgress, setMediaProgress] = useState(false)
    const [uploadProgress, setUploadProgress] = useState(0)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const fileChangeHandler = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append("file", file);
            setMediaProgress(true);

            try {
                const res = await axios.post('http://localhost:8000/api/v1/media/upload-video', formData,
                    {
                        onUploadProgress: ({ loaded, total }) => {
                            setUploadProgress(Math.rounded((loaded * 100) / total))
                        }
                    })
                    if(res.data.success){
                        setUploadVideoInfo({
                            videoUrl: res.data.data.url,
                            publicId: res.data.data.public_id, 
                        })
                        toast.success(res.data.message)
                    }

            } catch (error) {
                console.log(error)
                toast.error("Video upload failed")
            }finally{
                setMediaProgress(false)
            }
        }
    }

    const editLectureHandler = async (e) => {
       e.preventDefault();
       const data = {
          lectureTitle,
          videoInfo: uploadVideoInfo,
          isPreviewFree:isFree
       }
       try {
          setLoading(true)
          const res = await axios.post(`http://localhost:8000/api/v1/course/${courseId}/lecture/${lectureId}`, data, {
            headers: {
                "Content-Type":"application/json",   
            },
            withCredentials:true
          })
          if(res.data.success){
             dispatch([...lecture, setLecture(res.data.lecture)])
             toast.success(res.data.message)
          }
       } catch(error) {
         console.log(error)
         toast.error("Failed to edit lecture")
       }
    }

    const removeLectureHandler = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.delete(`http://localhost:8000/api/v1/course/lecture/${lectureId}`,
            {withCredentials:true})
            if(res.data.success){
                navigate(`/admin/course/${courseId}/lecture`)
                toast.success(res.data.message)
            }else{
                toast.error(res.data.message)
            }
        } catch (error) {
           console.log(error) 
           toast.error("Failed to delete lecture")
        }
    }
    return (
        <Card>
            <CardHeader className="flex justify-between">
                <div>
                    <CardTitle>Edit Lecture</CardTitle>
                    <CardDescription>Make changes and click save when done.</CardDescription>
                </div>
                <div className='flex items-center gap-2'>
                    <Button variant='destructive'>
                        Remove Lecture
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <div>
                    <Label>Title</Label>
                    <Input type="text" placeholder="Ex. Introduction to javascript"></Input>
                </div>
                <div className='my-5'>
                    <Label>Video <span className='text-red-500'>*</span></Label>
                    <Input type="file" accept="video/*" placeholder="Ex. Introduction to javascript" className="w-fit"></Input>
                </div>
                <div className='flex items-center space-x-2 my-5'>
                    <Switch className="bg-gray-800" />
                    <Label>Is this video FREE</Label>
                </div>
                <div className='mt-4'>
                    <Button className="bg-gray-800 hover:bg-gray-800">Update Lecture</Button>
                </div>
            </CardContent>
        </Card>
    )
}

export default LectureTab