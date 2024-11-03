import {Router} from "express";
import {logOutUser ,loginUser ,Signup} from "../controller/auth.controller.js"
import  {VerifyJwt} from "../middleware/authMiddle.js"
const router= Router();
router.route("/signup").post(Signup)
router.route("/login").post(loginUser)
router.route("/logout").post(VerifyJwt,logOutUser)
   

export default router