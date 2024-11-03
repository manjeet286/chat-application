import { Router } from "express";
import { sendMessage ,getMessage } from "../controller/message.controller.js";

import {VerifyJwt} from "../middleware/authMiddle.js"
const router= Router();
router.route("/:id").get( VerifyJwt ,getMessage)
router.route("/send/:id").post( VerifyJwt ,sendMessage)
export default router