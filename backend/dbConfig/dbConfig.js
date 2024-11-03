import mongoose from "mongoose";
const connectDB= async()=>{
    try {
          await mongoose.connect(process.env.DATABASE_URL)
          console.log("Connect to MONGODB")
    } catch (error) {
        console.log("Error while connection  to the database")
    }
}
export default connectDB