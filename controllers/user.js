import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import UserModal from "../models/user.js";
import AllUsersModel from "../models/allUsers.js";
const secret = "test";

export const signin = async (req, res) => {
  const { email, password, EmpCode } = req.body;

  try {
    // console.log("hello")
    const oldUser = await AllUsersModel.findOne({ email });
    // console.log("oldUser",oldUser,oldUser.Password,password)
    const oldEmpCode = await AllUsersModel.findOne({ EmpCode });

    if (!oldEmpCode)
      return res.status(404).json({ message: "User doesn't Exsist" });

    if (!oldUser)
      return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.Password);
    //  console.log("pass",isPasswordCorrect)
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
      expiresIn: "1h",
    });

    res.status(200).json({ result: oldUser, token });
  } catch (err) {
    res.status(500).json({ message: err});
  }
};

export const signup = async (req, res) => {
  const { email, password, firstName, lastName, empCode, confirmPassword } =
    req.body;

  try {
    const oldUser = await UserModal.findOne({ email });

    if (oldUser)
      return res.status(400).json({ message: "User already exists" });

    const oldEmpCode = await UserModal.findOne({ empCode });

    if (oldEmpCode)
      return res.status(404).json({ message: "Employee Already Exsist" });

    if (password != confirmPassword)
      return res.status(404).json({ message: "password did not match" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await UserModal.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
      empCode: empCode
    });

    const token = jwt.sign({ email: result.email, id: result._id }, secret, {
      expiresIn: "1h",
    });

    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });

    console.log(error);
  }
};


export const findUser = async (req, res) => {
  // res.send("This Works");
  const { name, psi, empCode } = req.body;

  try {
    let userList=[]
    if(empCode){userList = await UserModal.find({empCode:empCode});}
    else if(psi){userList = await UserModal.find({psi:psi});}
    else if(name){userList = await UserModal.find({name:name});}
    
    
    res.status(200).json(userList);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};