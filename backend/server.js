
import dotenv from "dotenv"
import { app } from './app.js'

import connectDB from "./dbConfig/dbConfig.js"

dotenv.config({
      path:'./env'
})
connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8002, ()=>{
        console.log(`Server is Runnig at Port Mongo DB Connect Succesfully : ${process.env.PORT}`);
    })
})
.catch((error)=>{
    console.log("MONGO db Connection Failed!!!! " , error)
})