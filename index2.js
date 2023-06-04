import express from "express";
import path from "path";

const app = express();
 
// Setting up view Engine
app.set("view engine", "ejs");

app.get("/", (req, res) =>{
    // res.send("Hi");

    // res.sendStatus(404);  {Not found}
    // res.sendStatus(500);   (Bad request)
    // res.status(400).send("Meri marzi");


    // res.json({
    //     success: true,
    //     products: [],
    // });


    // const pathlocation = path.resolve();
    // res.sendFile(path.join(pathlocation, "./index.html"));




    res.render("index.ejs", {name: "Debasish Rana"});
});

app.listen(5000, ()=>{
    console.log("Server is working");
});