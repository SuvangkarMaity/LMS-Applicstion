import express from 'express'
import { singleupload } from '../middleware/multer';
import getDataUri from '../utils/dataUri';
import cloudinary from '../utils/cloudinary';

const router = express.Router();

router.route("/upload-video").post(singleupload, async(req, res)=>{
    try {
      const file = req.file;
      const  fileUri =  getDataUri(file)

      const result = await cloudinary.uploader.upload(fileUri,{
        resource_type:"auto"
      })
      res.status(200).json({
        success:true,
        message:"File uploaded successfully",
        data:result
      })
    } catch(error) {
        console.log(error)
        res.status(500).json({
            message: "Error uploading file"
        })
        
    }  
})

