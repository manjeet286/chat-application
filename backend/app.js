import express from "express"
import cors from "cors"
import  cookieParser from "cookie-parser"

const app= express()
app.use(cors({
      origin:process.env.CORS_ORIGIN,
      credentials:true,
}))
app.use(express.json());
app.use(cookieParser());
import Userouter from "./Routes/authRoutes.js"
import MessageRouter from "./Routes/message.routes.js"
import  router from "./Routes/user.route.js"
app.use("/api/auth/users" , Userouter)
app.use("/api/messages" ,MessageRouter)
app.use("/api/user" ,router)
export {app}