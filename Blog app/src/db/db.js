import mongoose from "mongoose";

const connection = async ()=>{
    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>{
        console.log("Connected")
    })
    .catch((error)=>{
        console.log("Not connected",error);
    })
}

export default connection;
