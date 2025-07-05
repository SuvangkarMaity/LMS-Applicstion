import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import connectDB from "./utils/db.js"
import userRoute from "./routes/user.route.js"
import mediaRoute from "./routes/media.route.js"
import cookieParser from "cookie-parser"
import cors from 'cors'
import courseRoute from "./routes/course.route.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

//default middleware
app.use(express.json())
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));
app.use(cors({
  origin:"http://localhost:5173",
  credentials:true 
}))

//apis
app.use("/api/v1/user", userRoute)
app.use("/api/v1/course", courseRoute)
app.use("/api/v1/media", mediaRoute)

app.use('/images', express.static('images'));

// Slide Schema
const slideSchema = new mongoose.Schema({ url: String });
const Slide = mongoose.model('Slide', slideSchema);

//routing
app.get('/api/slides', async (req, res) => {
  try {
    const slides = await Slide.find();
    res.json(slides);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch slides' });
  }
});

app.listen(PORT, ()=>{
   connectDB()
  console.log(`Server listen as port ${PORT}`);  
}) 
