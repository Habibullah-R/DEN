import connection from "./db/db.js"
import dotenv from "dotenv";
import { server } from "./app.js"

dotenv.config();


connection()
.then(()=>{
    const PORT= process.env.PORT; 
    server.listen(PORT,()=>{
        console.log("Listening",PORT )
    })
})
.catch(()=>{
    console.log("Error while connecting to Database.")
    process.exit(1);
})