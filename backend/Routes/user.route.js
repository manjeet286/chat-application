import {Router} from "express"
import { VerifyJwt } from "../middleware/authMiddle.js";
import { getUserForSidebar } from "../controller/user.controller.js";
const router= Router();
router.route("/").get(VerifyJwt ,getUserForSidebar)

export default router