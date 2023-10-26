import express from "express";
import { getUsers,findUser, addUser,updateUserInfo, deleteUser,findUserById } from "../controllers/allUsers.js";


const router = express.Router();

router.get("/getalluser", getUsers);
router.post("/adduser", addUser);
router.post("/updateuser/:id", updateUserInfo);
router.delete("/deleteuser/:id", deleteUser);
router.get("/finduserbyid/:id",findUserById);
router.post("/finduser", findUser);

export default router;