const express = require('express');
const bodyParser = require('body-parser');
const fs=require('fs');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/',(req,res)=>{
    fs.readFile('message.txt',(err,data)=>{
        if(err){
            console.log("No data");
        }else{
            res.send(`${data}<form action="/" method="POST" onsubmit="document.getElementById('username').value=localStorage.getItem('username')" >
            <input id="message" name="message" type="text">
            <input type="hidden" name="username" id="username">
            <button type="submit">send</button>`)
        }

        }
)}
    )

app.post('/',(req,res)=>{
    fs.writeFile('message.txt',`${req.body.username}:${req.body.message}` ,{flag : 'a'},(err)=>{
        err ? console.log(err) : res.redirect('/');
    }) 
});
app.get('/login', (req, res, next) => {
    res.send(`
    <form onsubmit="localStorage.setItem('username', document.getElementById('username').value)" action="/" method="POST">
  
    <input id="username" type="text" name"title">
  
    <button type="submit">add</button>
  
  </form>
    `);
    
  
  });
app.listen(4000);
