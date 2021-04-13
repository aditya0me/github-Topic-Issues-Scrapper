/*code for writing a json file 
const fs= require("fs");
let arr = [];
arr.push({
    name:"aditya",
    age:21
});

arr.push("I am string");
let content = JSON.stringify(arr);
fs.writeFileSync("ch.json",content);
*/

const fs= require("fs");
let contentOfTheFile = fs.readFileSync("ch.json");
let arr = JSON.parse(contentOfTheFile);
arr.push({
    name:"Sai",
    age:21
});
//again writing to the json file after updating
fs.writeFileSync("ch.json",JSON.stringify(arr));