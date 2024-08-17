import app from "./app.js"
import connection from "./db/db.js"
import dotenv from "dotenv";

dotenv.config();


connection()
.then(()=>{
    app.listen(3000,()=>{
        console.log("Listening")
    })
})
.catch(()=>{
    console.log("Error while connecting to Database.")
    process.exit(1);
})