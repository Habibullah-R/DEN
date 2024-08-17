import cookieParser from "cookie-parser";
import express, { urlencoded } from "express";
import cors from "cors"
import userRoutes from "./routes/user.routes.js"
import postRoutes from "./routes/post.routes.js"
import path from "path"

const __dirname = path.resolve();

const app = express();

app.use(cookieParser());
app.use(cors({credentials:true}));
app.use(express.static("public"))
app.use(express.json({limit:"16kb"}));
app.use(urlencoded({extended:true,limit:"16kb"}))


app.use('/api/v1/user',userRoutes)
app.use('/api/v1/post',postRoutes)


app.use(express.static(path.join(__dirname,"/client/dist")))

app.use('*',(req,res)=>{
    res.sendFile(path.join(__dirname , 'client','dist','index.html'))
})

export default app;