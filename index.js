// const http = require("http");
import http from "http";

// importing new module

// const gfName = require("./features");
import gfName from "./features.js";

import {gfName1, gfName2} from "./features.js";
console.log(gfName);
console.log(gfName1);
console.log(gfName2);

import{generateLoveParcent} from "./features.js";
console.log(generateLoveParcent());


// fs is used to read the files
import fs from "fs";
const home = fs.readFile("./index.html", ()=>{
    console.log("File read succesfully");

});
console.log(home);

const homie = fs.readFileSync("./index.html");

const server = http.createServer((req, res)=>{

    // console.log(req.url);
    // console.log("Server is Working");
    // res.end("<h1>Ah Shit! Here we go again</h1>");

    if(req.url === "/about"){
        res.end("<h1>About Page</h1>");
    }

    else if(req.url === "/"){
         
        
        
        res.end("<h1>Home Page</h1>");
        res.end(homie);
    }

    else if(req.url === "/contacts"){
        res.end("<h1>Contact Page</h1>");
    }

    else{
        res.end("<h1>Page Not Found</h1>")
    }
  
});

server.listen(5000, ()=>{
    console.log("Server is perfectly working");
})