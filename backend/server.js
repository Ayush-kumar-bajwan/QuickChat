import express from "express"
import dotenv from "dotenv"
import connectDB from "./db/connectDb.js"
import path from "path"
import cookieParser from "cookie-parser"
import messageroutes from "./routes/message.routes.js"
import authroutes from "./routes/auth.routes.js"
import userroutes from "./routes/user.routes.js"
import {app, server} from "./socket/socket.js"

dotenv.config();

const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();


app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authroutes);
app.use('/api/messages',messageroutes);
app.use('/api/user',userroutes);

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname,"/frontend", "dist", "index.html"));
});


server.listen(PORT, ()=>{
    connectDB();
    console.log(`Server is running on port : ${PORT}`)
});
