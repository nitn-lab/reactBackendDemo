import mongoose from "mongoose";
import AllUsers from "../models/allUsers.js";


// const csv=require('csvtojson')

export const getUsers = async (req, res) => {
  // res.send("This Works");
  try {
    const allUsers = await AllUsers.find();
    // console.log("getPosts controller", postMessages);
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const addUser = async (req, res) => {
  //   res.send("Post Created");
  const userdata = req.body;
  const newUser = new AllUsers({ ...userdata, createdAt: new Date().toISOString() });
  // console.log("createPost controller", newUser);
  try {
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateUserInfo = async (req, res) => {
  const { id: _id } = req.params
  const userinfo = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No user with that id");

  const updateUser = await AllUsers.findByIdAndUpdate(_id, userinfo, {
    new: true,
  });

  res.json(updateUser);
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No user found with that id");

  await AllUsers.findByIdAndRemove(id);

  res.json({ message: "User deleted successfully." });
};

export const findUser = async (req, res) => {
    // res.send("This Works");
    const {query} = req.body;
  
    try {
      let userList=[]
      userList=await AllUsers.find({
        $or: [
        { Name: { $regex: query, $options: 'i' } }, 
        { PSINo: { $regex: query, $options: 'i' } }, 
        { BeltNo: { $regex: query, $options: 'i' } }, 
      ]})
      res.status(200).json(userList);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
};

export const findUserById = async (req, res) => {
  // res.send("This Works");
  const { id: _id } = req.params

  try {
    let userList=[]
    userList=await AllUsers.findById({_id})
    res.status(200).json(userList);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};