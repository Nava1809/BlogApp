const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require("cors")
const port = 5000;
const bodyParser = require("body-parser");

const connectionUrl = `mongodb+srv://paripallinavaraj18:MRYG6BcTVZ8FzqgF@cluster0.iq6pr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
app.use(cors());

mongoose.set('strictQuery', true);
mongoose.connect(connectionUrl).then(()=>console.log("db connected")).catch((e)=>{console.log(e)})
app.use(bodyParser.json());

const registerAndlogin=require("./Routes/RegisterAndLogin")
const BlogRoute=require("./Routes/blogRoute")

  app.use("/api",BlogRoute)
  app.use("/api/auth",registerAndlogin)
app.listen(port,()=>{console.log(`server is up at port ${port}`)})