const express = require('express');

const app = express();

app.get('/', (req,res)=>{
    res.send(req.ip);
})

app.listen(3000, ()=>{
    console.log("Listen on port 3000");
})

