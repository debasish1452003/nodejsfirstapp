import express from "express";
import path from "path";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";

mongoose
  .connect("mongodb://127.0.0.1:27017", {
    dbName: "Backend",
  })
  .then(() => console.log("Database Connected"))
  .catch((e) => console.log(e));


const userSchema = new mongoose.Schema({
  name: String,
  email: String,
});



const User = mongoose.model("Users", userSchema);


// const users = [];

const app = express();

// Using middle wares
app.use(express.static(path.join(path.resolve(), "public")));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());



// Setting up view Engine
app.set("view engine", "ejs");



// app.get("/", (req, res) =>{

//     // res.render("index.ejs", {name: "Debasish Rana"});
//     res.render("login.ejs");
//     // req.sendFile("index.html");
// });



const isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;
  if (token) {
    const decoded = jwt.verify(token, "sdjasdbajsdbjasd");

    req.user = await User.findById(decoded._id);

    next();
  } else {
    res.redirect("/login");  
  }
};



app.get("/", isAuthenticated, (req, res) => {
  console.log(req.user);
  res.render("logout");
  // res.render("logout", { name: req.user.name });
});



// app.get("/",  (req, res) =>{
//      const { token } = req.cookies;

//      if(token){
//         res.render("logout"); ``
//      }
//      else{
//         res.render("login");
//      }

//     res.render("login");
// });



app.post("/login", async (req, res) => {
  const { name, email } = req.body;

  let users = await User.findOne({ email });

  if (!users) {
    return res.redirect("/register");
  }

  const user = await User.create({
    name,
    email,
  });

  const token = jwt.sign({ id: user._id }, "sdjasdbajsdbjasd");

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + 60 * 1000),
  });
  res.redirect("/");
});



app.get("/login", (req, res) => {
    res.render("register");
});


app.get("/register", (req, res) => {
  res.render("register");
});



app.post("/register", async (req, res) => {
  const { name, email } = req.body;

  let users = await User.findOne({ email });

  if (users) {
    return res.redirect("/login");
  }

  const user = await User.create({
    name,
    email,
  });

  const token = jwt.sign({ id: user._id }, "sdjasdbajsdbjasd");

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + 60 * 1000),
  });
  res.redirect("/");
});



app.get("/logout", (req, res) => {
  res.cookie("token", null, {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.redirect("/");
});

// app.get("/add", (req, res) =>{
//    Messge.create({name: "Abhi", email: "sample@gmail.com"}).then(()=>{
//     res.send("Nice");
//    });
// });



app.listen(5000, () => {
  console.log("Server is working");
});
