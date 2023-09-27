import express from "express";
const router = express.Router();

import { signin, signup,findUser } from "../controllers/user.js";

router.post("/signin", signin);
router.post("/signup", signup);
router.post("/finduser", findUser);

export default router;