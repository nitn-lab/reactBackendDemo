import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import UserModal from "../models/user.js";

const secret = "test";

export const signin = async (req, res) => {
  const { email, password, empCode } = req.body;

  try {
    const oldUser = await UserModal.findOne({ email });

    const oldEmpCode = await UserModal.findOne({ empCode });

    if (!oldEmpCode)
      return res.status(404).json({ message: "Employee Already Exsist" });

    if (!oldUser)
      return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
      expiresIn: "1h",
    });

    res.status(200).json({ result: oldUser, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
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
    
    // console.log("getPosts controller", postMessages);
    res.status(200).json(userList);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};