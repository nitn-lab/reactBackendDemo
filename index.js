import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import postRoutes from './routes/posts.js';
import userRouter from "./routes/user.js";
import alluserRouter from "./routes/alluser.js";
import { addUser } from './controllers/allUsers.js';
const app = express();
dotenv.config();


app.use(bodyParser.json({ limit: '30mb', extended: true}));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true}));
app.use(cors());

app.use('/posts', postRoutes);
app.use("/user", userRouter);
app.use("/alluser", alluserRouter);

const CONNECTION_URL = "mongodb+srv://fullStack:fullStack8412@cluster0.fgiv43w.mongodb.net/?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true})
.then(() => app.listen(PORT, () => console.log(`Server running on port : ${PORT}`)))
.catch((error) => console.log(error.message))

// mongoose.set('useFindAndModify', false); 


