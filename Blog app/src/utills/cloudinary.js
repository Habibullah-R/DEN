import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

// Configuration
cloudinary.config({ 
    cloud_name: 'dzc5azhvc', 
    api_key: '776512173483417', 
    api_secret: process.env.CLOUDINARY_API_SECRET
});


const uploadFile = async(LocaleFilePath)=>{
    try {
        if(!LocaleFilePath) return null;
        const response = await cloudinary.uploader.upload(LocaleFilePath,
            {
                resource_type:"auto"
            }
        )
        fs.unlinkSync(LocaleFilePath);
        return response;
    } catch (error) {
        fs.unlink(LocaleFilePath);
        return null;
    }
}

export default uploadFile;
